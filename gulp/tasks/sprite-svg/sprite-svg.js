var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var svgmin      = require('gulp-svgmin');
var svgStore    = require('gulp-svgstore');
var rename      = require('gulp-rename');
var cheerio     = require('gulp-cheerio');
var through2    = require('through2');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');

gulp.task('sprite:svg', function() {
    return gulp
        .src(config.src.iconsSvg + '/*.svg')
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }]
        }))
        .pipe(rename({ prefix: 'svg-' }))
        .pipe(svgStore({ inlineSvg: false }))
        .pipe(through2.obj(function(file, encoding, cb) {
            var $ = file.cheerio;
            var data = $('svg > symbol').map(function() {
                var size   = $(this).attr('viewBox').split(' ').splice(2);
                var name   = $(this).attr('id');
                var ratio  = size[0] / size[1]; // symbol width / symbol height
                var fill = $(this).find('[fill]:not([fill="currentColor"])').attr('fill');
                return {
                    name: name,
                    ratio: ratio,
                    fill: fill || 'initial'
                };
            }).get();
            this.push(file);
            gulp.src(__dirname + '/_sprite-svg.scss')
                .pipe(consolidate('lodash', {
                    symbols: data
                }))
                .pipe(gulp.dest(config.src.sassGen));
            cb();
        }))
        .pipe(cheerio({
            run: function($, file) {
                $('[fill]:not([fill="currentColor"])').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ basename: 'sprite' }))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('sprite:svg:watch', function() {
    gulp.watch(config.src.iconsSvg + '/*.svg', ['sprite:svg']);
});
