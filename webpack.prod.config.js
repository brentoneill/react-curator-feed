const webpack = require("webpack");

module.exports = {
  entry: "./src/wrapper.js",
  output: {
    libraryTarget: "var",
    library: "showCuratorFeed",
    path: "builds",
    filename: "curator-feed.js"
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: "babel",
        include: __dirname
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};
