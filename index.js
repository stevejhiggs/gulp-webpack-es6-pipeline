const log = require('fancy-log');
const webpack = require('webpack');
const PluginError = require('plugin-error');
const config = require('./webpack.config');
const releaseConfig = require('./webpack.config.release');

const handleWebpackOutput = (err, stats) => {
  if (err) throw new PluginError('es6Pipeline', err);
  log(
    '[es6Pipeline]',
    stats.toString({
      colors: true,
      chunks: false
    })
  );
};

const getDevCompiler = (options) => {
  return webpack(config(options));
};

const getReleaseCompiler = (options) => {
  return webpack(releaseConfig(options));
};

const registerBuildGulpTasks = (gulp, options) => {
  gulp.task('es6Pipeline:build:dev', (done) => {
    const compiler = getDevCompiler(options);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });

  gulp.task('es6Pipeline:build:release', (done) => {
    const compiler = getReleaseCompiler(options);
    compiler.run((err, stats) => {
      handleWebpackOutput(err, stats);
      done();
    });
  });

  gulp.task(
    'es6Pipeline:watch',
    gulp.series('es6Pipeline:build:dev', () => {
      const compiler = getDevCompiler(options);
      compiler.watch(
        {
          aggregateTimeout: 300, // wait so long for more changes
          poll: 2000 // windows needs polling to pick up changes :(
        },
        (err, stats) => {
          handleWebpackOutput(err, stats);
        }
      );
    })
  );
};

module.exports = {
  registerBuildGulpTasks: registerBuildGulpTasks,
  getDevCompiler: getDevCompiler,
  getReleaseCompiler: getReleaseCompiler
};
