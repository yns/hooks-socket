const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'App'),
  
  output: {
    path: path.join(__dirname, 'dist'),
    //publicPath: '/dist/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      use: {
        // Use the following loader and options
        loader: "babel-loader",
        // We can pass options to both babel-loader and Babel. This option object
        // will replace babel.config.js
        options: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        debug: true, // Output the targets/plugins used when compiling

                        // Configure how @babel/preset-env handles polyfills from core-js.
                        // https://babeljs.io/docs/en/babel-preset-env
                        //useBuiltIns: 'usage',

                        // Specify the core-js version. Must match the version in package.json
                        corejs: 3

                        // Specify which environments we support/target for our project.
                        // (We have chosen to specify targets in .browserslistrc, so there
                        // is no need to do it here.)
                        // targets: "",
                    }
                ],

                // The react preset includes several plugins that are required to write
                // a React app. For example, it transforms JSX:
                // <div> -> React.createElement('div')
                "@babel/preset-react"
            ],
            plugins: [
                [
                    "@babel/plugin-proposal-class-properties",
                    {
                        "loose": true
                    }
                ]
            ]
        }
    },
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  }
};