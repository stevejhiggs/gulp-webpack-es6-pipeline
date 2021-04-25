const commonConfig = require('./webpack.config');

module.exports = (options) => {
  const releaseConfig = Object.assign({}, commonConfig(options));
  releaseConfig.devtool = 'source-map';
  releaseConfig.mode = 'production';
  return releaseConfig;
};
