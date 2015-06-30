var gulp = require('gulp');

var index = require('./index');

//gulp.src(['./test/**/*.css'/*, './test/**/*.html', './test/**/*.js'*/])
gulp.src('./test/**/*.html')
  .pipe(index({
    basedir: './'
  }))
  .pipe(gulp.dest('dist'));