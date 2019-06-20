// webpack-prod-config.js

// contains configuration data related to prod build

const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('./paths');
const common = require('./webpack-common-config.js');

module.exports = merge(common, {
  entry: {
    // Split vendor code into separate bundlesappBuild
    vendor: ['react'],
    app: paths.appIndexJs
  },
  mode: 'production',
  // Set JS bundle name using chuckhash
  // (e.g. '5124f5efa5436b5b5e7d_app.js')
  // Output destination:
  output: {
    filename: '[chunkhash]_[name].js',
    path: paths.appBuild,
    publicPath: '/'
  },
  plugins: [
    // Uglify, minify JavaScript
    new UglifyJSPlugin(),
    // Set process.env.NODE_ENV to production
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // Extract text/stylesheets from bundles into separate file.
    new ExtractTextPlugin('styles.css')
  ],
  module: {
    rules: [
      {
        // Look for .js or .jsx files
        test: /\.(js|jsx)$/,
        // In app's `src` directory
        include: path.resolve(paths.appSrc),
        exclude: /node_modules/,
        use: {
          // Use babel for transpiling JavaScript files
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react']
          }
        }
      },
      {
        // Look for .css or .scss files.
        test: /\.(css|scss)$/,
        // In the app's `public` directory
        include: [path.resolve(paths.appAssets)],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // DiscardDuplicates: true,   // need to research, options looks to have been deprecated in new css-loader version
                sourceMap: false,
                // Enable local-scoped CSS based in CSS Modules spec
                modules: true,
                // Generate unique name for each class (e.g. app__app___2x3cr)
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        })
      }
    ]
  }
});
