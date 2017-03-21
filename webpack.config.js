const path = require('path');
const fs = require('fs');

const findEslintFile = (options) => {
  if (options.eslintFile) {
    if (fs.existsSync(options.eslintFile)) {
      console.log(`using custom eslint file at ${options.eslintFile}`);
      return options.eslintFile;
    }

    console.warn(`custom eslint file not found at ${options.eslintFile}`);
  }

  const rootEslint = path.resolve('./.eslintrc');
  if (fs.existsSync(rootEslint)) {
    console.log(`using custom eslint file at ${rootEslint}`);
    return rootEslint;
  }

  // default internal file
  return path.join(__dirname, '.eslintrc');
};

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
            configFile: findEslintFile(options)
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
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-3')
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
