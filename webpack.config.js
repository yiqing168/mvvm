const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页",
      inject: "body",
      template: path.resolve(__dirname, "./src/index.html")
    })
  ],
  // loader配置
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        //排除node_modules 目录下的文件
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
    port: 3000,
    compress: true
  }
};
module.exports = config;
