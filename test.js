var gulp = require('gulp');

var index = require('./index');

gulp.src(['./test/**/*.css', './test/**/*.html'])
  .pipe(index())
  .pipe(gulp.dest('dist'));