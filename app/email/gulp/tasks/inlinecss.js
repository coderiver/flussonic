var gulp  = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');
var replace = require('gulp-replace');
// var inlineCss = require('gulp-inline-css');
var premailer = require('gulp-premailer');
reload = browserSync.reload;


gulp.task('inlinecss', function () {
    console.log(config.dest.root);
    gulp.src(config.dest.root+'/*.html')
        .pipe(premailer({
            'remove-classes': true
            // 'input_encoding':'UTF-8',
            // ':output_encoding':'UTF-8'
        }))
        .pipe(replace('[%', '<%'))
        .pipe(replace('&lt;%', '<%'))
        .pipe(replace('%]', '%>'))
        .pipe(replace('%&gt;', '%>'))
        .pipe(replace('[]', "\n"))
        .pipe(gulp.dest(config.dest.root))
        // .pipe(reload({stream: true}));
});

gulp.task('inlinecss:watch', function() {
    // console.log('inlinecss:watch WAAAT');
    // gulp.watch([
    // 	config.dest.css+'/*.css'
    // ], ['nunjucks','inlinecss']);
});

// gulp.task('inlinecss', function () {
// 	console.log('blabla');
//     gulp.src(config.dest.root+'*.html')
//         .pipe(inlineCss())
//         .pipe(gulp.dest(config.dest.root))
//         // .pipe(reload({stream: true}));
// });
