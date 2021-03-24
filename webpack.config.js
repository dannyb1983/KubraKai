const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "client/"),
    port: 8080,
    publicPath: "http://localhost:8080",
    proxy: {
      '/': {
        target: 'http://localhost:4000',
        secure: false,
      }
    },
    hot: true,
    historyApiFallback: true
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  plugins:[new HtmlWebpackPlugin({template: 'index.html' })],
}

