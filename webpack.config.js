'use strict';

const path = require('path');

module.exports = (options) => {
  const config = {
    resolve: {
      modules: [
        'node_modules',
        path.join(__dirname, 'node_modules')
      ],
      extensions: ['.js', '.jsx', '.json']
    },
    entry: options.entryPoints,
    output: {
      path: path.join(options.outputDir),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: require.resolve('eslint-loader'),
          query: {
            configFile: path.join(__dirname, '.eslintrc')
          }
        },
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [
                require.resolve('babel-preset-es2015'), 
                { 
                  loose: true,
                  modules: false 
                }
              ],
              require.resolve('babel-preset-react')
            ]
          }
        }
      ]
    },
    plugins: [],
    devtool: 'cheap-source-map',
    performance: {
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000
    }
  };

  return config;
};
