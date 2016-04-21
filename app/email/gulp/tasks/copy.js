var gulp   = require('gulp');
var config = require('../config.js');


gulp.task('copy', function() {
   gulp.src([config.src.img+'/*.*'])
   .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:watch', function() {
    gulp.watch(config.src.img+'/*', ['copy']);
});

