'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  appInputEntryPoint: path.join(__dirname, './src/index.js'),
  bundleOutputPath: path.join(__dirname, '/dist/'),
  bundleOutputPublicPath: '/dist/',
  bundleOutputJsFile: 'bundle.js',
  bundleOutputCssFile: 'bundle.css'
}

const pathsToClean = [
  'dist'
]

const babelSettings = {
  extends: path.join(__dirname, '/.babelrc')
}

const miniCssExtractPluginConfig = {
  filename: paths.bundleOutputCssFile,
  chunkFilename: "[name].css"
}

module.exports = {
  entry: [
    paths.appInputEntryPoint
  ],
  output: {
    path: paths.bundleOutputPath,
    publicPath: paths.bundleOutputPublicPath,
    filename: paths.bundleOutputJsFile,
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?' + JSON.stringify(babelSettings)
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            query: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname + '/postcss.config.js'
              }
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/common/abstracts/functions.scss',
                './src/common/abstracts/mixins.scss',
                './src/common/abstracts/placeholders.scss',
                './src/common/abstracts/variables.scss'                  
              ]
            }
          }
        ]
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
      common: path.join(__dirname, './src/common'),
      components: path.join(__dirname, './src/components'),
      modules: path.join(__dirname, './src/modules'),
      services: path.join(__dirname, './src/services')   
    }
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new MiniCssExtractPlugin(miniCssExtractPluginConfig)
  ],
  stats: {
    children: false,
    warnings: false
  },
  watchOptions: {
    ignored: /node_modules/
  }
}
