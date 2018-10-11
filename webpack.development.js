'use strict';

const path = require('path');
const baseConfigObj = require('./webpack.base.js');
const WebpackNotifierPlugin = require('webpack-notifier');
const WebpackLiveReloadPlugin = require('webpack-livereload-plugin');
const WebpackStyleLintPlugin = require('stylelint-webpack-plugin');

const developmentConfigLocalObj = {
  devtool: 'inline-source-map'
}

const developmentConfigObj = Object.assign({}, baseConfigObj, developmentConfigLocalObj);

const webpackNotifierPluginConfig = new WebpackNotifierPlugin({
  alwaysNotify: false,
  excludeWarnings: true,
  skipFirstNotification: true,
  title: 'Webpack Bundler',
  contentImage: path.join(__dirname, './webpack.png')
});

const webpackLiveReloadPluginConfig = new WebpackLiveReloadPlugin({
  protocol: 'http',
  hostname: 'localhost',
  appendScriptTag: true
});

const webpackStyleLintPluginConfig = new WebpackStyleLintPlugin({
  configFile: path.join(__dirname, './.stylelintrc'),
  context: path.join(__dirname, './src'),
  failOnError: false,
  fix: true
});

const webpackESLintLoaderConfig = {
  test: /\.js$/,
  enforce: 'pre',
  exclude: [
    path.join(__dirname, 'node_modules')
  ],
  loader: 'eslint-loader',
  options: {
    configFile: path.join(__dirname, './.eslintrc'),
    failOnError: false,
    fix: true
  }
}

developmentConfigObj.plugins.push(webpackStyleLintPluginConfig);
developmentConfigObj.plugins.push(webpackNotifierPluginConfig);
developmentConfigObj.plugins.push(webpackLiveReloadPluginConfig);
developmentConfigObj.module.rules.push(webpackESLintLoaderConfig);

module.exports = developmentConfigObj;