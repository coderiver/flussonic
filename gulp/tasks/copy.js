var gulp   = require('gulp');
var config = require('../config.js');

gulp.task('copy:fonts', function() {
    return gulp
        .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:lib', function() {
    return gulp
        .src(config.src.lib + '/**/*.*')
        .pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', function() {
    return gulp
        .src(config.src.root + '/*.*')
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy', [
    // 'copy:rootfiles'
    'copy:fonts',
    'copy:lib'
]);
