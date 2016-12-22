# Easy transpiling of es6 back to browser friendly es5

Want all the hotness of es6 but not want the hassle of figuring out how to get:

* webpack 2
* babel
* gulp
* eslint

all set up and working together?

Great, neither do I. That's why I did it once and built this package.

## setting up

* install node > v4 + npm (note: node v5 is preferred)
* npm init your project in a folder `npm init`
* install global gulp `npm install -g gulp`
* add gulp package `npm install gulp --save-dev`
* add this package `npm install gulp-webpack-es6-pipeline --save-dev`
* create a file called `gulpfile.js in your project root`
* in your gulpfile add the following:

```
const gulp = require('gulp');
const es6Pipeline = require('gulp-webpack-es6-pipeline');

es6Pipeline.registerBuildGulpTasks(
  gulp,
  {
    entryPoints: {
      'BUNDLE_NAME': 'PATH_TO_ENTRY_POINT'
    },
    outputDir: 'PATH_TO_BUNDLE_OUTPUT_DIRECTORY'
  }
);

```

Your entrypoints are the first javascript files you want to enter. Webpack will
follow all the imports and requires to build you a final bundle.
Your bundles will be made in the output directory and called [BUNDLE_NAME].

e.g:

```
const gulp = require('gulp');
const es6Pipeline = require('gulp-webpack-es6-pipeline');

es6Pipeline.registerBuildGulpTasks(
  gulp,
  {
    entryPoints: {
      'myNiceBundle': __dirname + '/scripts/myentrypoint.js'
    },
    outputDir: __dirname + '/bundles'
  }
);
```

Will result in a bundle called `myNiceBundle.js` in `/bundles` under the root of your project

## gulp commands

You now have the following commands:

* `gulp es6Pipeline:build:dev` - build all the files in dev mode
* `gulp es6Pipeline:build:release` - build all the files in minified release mode
* `gulp es6Pipeline:watch` - rebuilds whenever a file is changed

## features

* linting (eslint + airbnb standard)
* babel (es6 -> es5)
* webpack (bundling)
* react support (jsx files handled automatically)

and then dump out the bundles.

## questions

### why did you do this?

Javascript tooling is awesome but the barrier to entry can be pretty high.
I'm hoping this will encourage people to use the tooling I rely on everyday.

Also I'd written equivalents of these scripts in about 10 different projects
and was tired of it :)

### holy crap that linters strict

I know, but trust me and stick with it.

### why no support for X?

I've kept this intentionally simple but feel free to contribute and we'll see if
there isn't some way to easily roll in other features.

### why no support for hotloading and the webpack dev server?

I've not yet come up with a clean way to integrate them and they are not strictly
needed for someone starting out with this stuff.
