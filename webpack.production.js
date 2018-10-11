'use strict';

const baseConfigObj = require('./webpack.base.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const productionConfigObj = baseConfigObj;
const optimizeCssAssetsPluginConfig = new OptimizeCssAssetsPlugin({
  cssProcessor: require('cssnano'),
  cssProcessorOptions: { 
    discardComments: { removeAll: true } 
  },
  canPrint: true
});

productionConfigObj.plugins.push(optimizeCssAssetsPluginConfig);

module.exports = productionConfigObj;