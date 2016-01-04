var gulp   = require('gulp');
var del    = require('del');
var util   = require('gulp-util');
var config = require('../config');

gulp.task('clean', function() {
    return del([
        config.dest.root
    ], function(err, paths) {
        util.log('Deleted:', util.colors.magenta(paths.join('\n')));
    });
});
