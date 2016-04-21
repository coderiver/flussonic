var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', [
	'copy:watch',
    'nunjucks:watch',
    'sass:watch',
    'inlinecss:watch'
]);
