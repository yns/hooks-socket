import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on("connection", (socket) => {
    
  // in a listener
    socket.on("test", (parameter) => {
      console.log("received => " + parameter);

      socket.emit("test", "serverdan cevap atıldı ->" + parameter);

    });
});

httpServer.listen(3000, () => {
  console.log("started");
});