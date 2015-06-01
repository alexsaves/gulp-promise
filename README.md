Gulp Promises
===================
Ensure reliable callbacks of multiple streams within a task.
###Installation &nbsp;  [![npm version](https://badge.fury.io/js/gulp-promise.svg)](http://badge.fury.io/js/gulp-promise)
```sh
npm install gulp-promise
```
###Simple Usage
```javascript
var promise = require("gulp-promise");

// the list of project
var projectsToBuild = {
  "proj1": true,
  "proj2": true
  "proj3": true
};

/**
 * Build JS
 */
gulp.task('js', function (cb) {

  // Build the promise list
  var promiselist = [];
  for (var proj in projectsToBuild) {
    promiselist.push(proj);
  }
  // Set up the promises
  promise.makePromises(promiselist, function () {
    if (cb) {
      cb();
    }
  });

  for (var proj in projectsToBuild) {
    gulp.src(['/src/**/*.js'])
      .pipe(gulp.dest('./out'))
      .pipe(promise.deliverPromise(proj));
  }

});
```

