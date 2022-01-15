import React, {useState, useEffect, useRef} from 'react';
import { io } from "socket.io-client";


export function SocketTest() {

    const [data, setData] = useState([]);
    const [fieldValue, setFieldValue] = useState("");

    const socketEventName = "test";
    const socketEventConnectionName = "connect";
    const socketRef = useRef();

    useEffect(() => {
        console.log("Initial Render");

        socketRef.current = io("http://localhost:3000");

        socketRef.current.on(socketEventConnectionName, () => {
            console.log(socketRef.current.id);
        });

        socketRef.current.on(socketEventName, listener);

        return () => {
            socketRef.current.off(socketEventConnectionName);
            socketRef.current.off(socketEventName);
        };

    },[]);

    function handleClick() {
        socketRef.current.emit(socketEventName, fieldValue);
    }

    function listener(arg) {
        console.log(arg);
        console.log("data : ", data);
        data.push(arg);
        setFieldValue("");
    }

    const onChangeHandler = event => {
        setFieldValue(event.target.value);
    };


    return (
        <div>
            <input type="text" name="ynsinput" onChange={onChangeHandler} value={fieldValue} />
            <button onClick={() => handleClick()}>
                Gönder
            </button>

            <ul>
            {data.map((item, i) => <li key={item + i}>{item}</li>)}
            </ul>
        </div>
        
      );

}
