let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')


let vendorModules = /(node_modules|bower_components|Fractal.js)/


module.exports = {
  target: "web",
  entry: {
    app: "./app/index",
  },

  output: {
    path: "./public",
    filename: "app.js",
    pathinfo: true,
    publicPath: "",
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: vendorModules,
        loader: "babel",
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" },
      { test: /\.bmp$/, loader: "url-loader?mimetype=image/bmp" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("init.js"),
    new HtmlWebpackPlugin({
      title: 'App',
      minify: false,
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  debug: true,
  devtool: "cheap-module-inline-source-map",
  profile: false,

  devServer: {
    contentBase: "./public",
    port: 3000,

    hot: true,
    inline: true,
    historyApiFallback: true,

    colors: true,
    stats: 'normal',
  },
}
