const webpack = require('webpack');
const commonConfig = require('./webpack.config');

module.exports = (options) => {
  const releaseConfig = Object.assign({}, commonConfig(options));
  releaseConfig.devtool = 'sourcemap';
  releaseConfig.mode = 'production';
  return releaseConfig;
};
