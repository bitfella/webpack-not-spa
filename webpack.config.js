const path = require('path');
const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const liveReloadPlugin = require('webpack-livereload-plugin');
const webpackNotifierPlugin = require('webpack-notifier');
const isProduction = process.argv.indexOf('-p') !== -1;

const liveReloadConfig = {
  protocol: 'http',
  port: 35729,
  hostname: 'localhost',
  appendScriptTag: isProduction ? false : true,
  ignore: null
}

const paths = {
  appInputEntryPoint: path.resolve(__dirname, './src/app.js'),
  bundleOutputFolder: path.resolve(__dirname, './dist'),
  bundleOutputJsFile: 'bundle.js',
  bundleOutputCssFile: 'bundle.css'
}

const notifyPluginConfig = {
  alwaysNotify: false,
  excludeWarnings: true,
  skipFirstNotification: true,
  contentImage: path.join(__dirname, 'webpack.png'),
  title: 'Webpack Module Bundler'
}

const config = {
  entry: [
    'babel-polyfill',
    paths.appInputEntryPoint
  ],
  output: {
    path: paths.bundleOutputFolder,
    filename: paths.bundleOutputJsFile
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: /node_modules/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: isProduction ? false : true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isProduction ? false : true
              }
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  './src/common/abstracts/functions.scss',
                  './src/common/abstracts/mixins.scss',
                  './src/common/abstracts/placeholders.scss',
                  './src/common/abstracts/variables.scss'                  
                ]
              },
            }         
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, './src/common'),
      components: path.resolve(__dirname, './src/components'),
      modules: path.resolve(__dirname, './src/modules'),
      services: path.resolve(__dirname, './src/services')     
    }
  },
  plugins: [
    new extractTextPlugin(paths.bundleOutputCssFile),
    new liveReloadPlugin(liveReloadConfig),
    new webpackNotifierPlugin(notifyPluginConfig)
  ],
  devtool: isProduction ? false : 'inline-source-map'
}

module.exports = config;