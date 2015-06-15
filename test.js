var gulp = require('gulp');

var index = require('index');

gulp.src('./**/*.css')
  .pipe(index())
  .pipe(gulp.dest('dist'));