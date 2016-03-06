'use strict';

const gutil = require('gulp-util');
const webpack = require('webpack');
const config = require('./webpack.config');
const releaseConfig = require('./webpack.config.release');

const registerBuildGulpTasks = (gulp, options) => {
  gulp.task('es6Pipeline:build:dev', function (done) {
    webpack(config(options), function (err, stats) {
      if (err) throw new gutil.PluginError('es6Pipeline:build:dev', err);
      gutil.log('[es6Pipeline:build:dev]', stats.toString({
        colors: true
      }));
      done();
    });
  });

  gulp.task('es6Pipeline:build:release', function (done) {
    webpack(releaseConfig(options), function (err, stats) {
      if (err) throw new gutil.PluginError('es6Pipeline:build:release', err);
      gutil.log('[es6Pipeline:build:release]', stats.toString({
        colors: true
      }));
      done();
    });
  });

  gulp.task('es6Pipeline:watch', ['es6Pipeline:build:dev'], function () {
    webpack(config(options)).watch({
      aggregateTimeout: 300 // wait so long for more changes
    }, function (err, stats) {
      if (err) throw new gutil.PluginError('es6Pipeline:watch', err);
      gutil.log('[es6Pipeline:watch]', stats.toString({
        colors: true
      }));
    });
  });
};

module.exports = {
  registerBuildGulpTasks: registerBuildGulpTasks
};
