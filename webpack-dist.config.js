let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')


let vendorModules = /(node_modules|bower_components)/

let CompressionPlugin = require('compression-webpack-plugin')
let CleanPlugin = require('clean-webpack-plugin')


module.exports = {
  target: "web",
  entry: {
    app: "./app",
  },

  output: {
    path: './dist',
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
      minify: process.env.NODE_ENV === 'production' ? {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        preventAttributesEscaping: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      } : false,
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanPlugin(['./dist']),
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }]),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    process.env.NODE_ENV === 'production' ? new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      comments: /\@license|\@preserv/gi,
    }) : function(source) {
      return source
    },
    new CompressionPlugin({
      asset: "{file}.gz",
      algorithm: "gzip",
      regExp: new RegExp("\.(js|html|css|svg)$"),
      threshold: 10240,
      minRatio: 0.8,
    })
  ],
  debug: false,
  watch: false,
}
