const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]-[hash].js',
    sourceMapFilename: 'js/[name].js.map',
  },

  plugins: [
    new CleanWebpackPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })

  ],

  module: {
    rules: [
      { 
        test: /src.*\.js$/, 
        use: ['babel-loader'], 
        exclude: /(node_modules)/ 
      },
        
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },

      { test: /\.html$/, loader: 'html-loader' },

      {
        test: /\.(png|svg|jpe?g|gif|ttf|eot|otf|woff2?)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name]-[hash].[ext]'
          }
        }]
      },

      
    ]
  }

  
};