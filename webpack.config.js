'use strict';

const path = require('path');

module.exports = (options) => {
  const config = {
    resolveLoader: {root: path.join(__dirname, 'node_modules')},
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    entry: options.entryPoints,
    output: {
      path: path.join(options.outputDir),
      filename: '[name].js'
    },
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: require.resolve('eslint-loader')
        }
      ],
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
          query: {
            presets: [
              require.resolve('babel-preset-es2015-loose'),
              require.resolve('babel-preset-react')
            ],
            plugins: [
              require.resolve('babel-plugin-transform-es3-property-literals'),
              require.resolve('babel-plugin-transform-es3-member-expression-literals')
            ]
          }
        }
      ]
    },
    plugins: [],
    devtool: 'cheap-source-map',
    debug: true,
    eslint: {
      configFile: path.join(__dirname, '.eslintrc')
    }
  };

  return config;
};
