var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

gulp.task('default', [
    'watch',
    'server'
]);

gulp.task('build', ['clean'],  function(cb) {
    runSequence(
        'sprite:svg',
        'imagemin',
        'sass',
        'swig',
        // 'browserify',
        'webpack',
        'copy'
    );
    cb();
});

gulp.task('watch', [
    'swig:watch',
    'sprite:svg:watch',
    'imagemin:watch',
    // 'browserify:watch',
    'webpack:watch',
    'sass:watch'
]);
