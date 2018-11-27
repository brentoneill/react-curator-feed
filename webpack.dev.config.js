var path = require("path");

module.exports = {
  entry: "./src/wrapper.js",
  output: {
    libraryTarget: "var",
    library: "showCuratorFeed",
    path: "builds",
    filename: "curator-feed.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "/"),
    compress: true,
    port: 9000
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: "babel",
        include: __dirname
      }
    ]
  }
};
