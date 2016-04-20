var gulp        = require('gulp');
var swig        = require('gulp-swig');
var plumber     = require('gulp-plumber');
var gulpif      = require('gulp-if');
var rename      = require('gulp-rename');
var changed     = require('gulp-changed');
var data        = require('gulp-data');
var path        = require('path');
var fs          = require('fs');
var prettify    = require('gulp-prettify');
var frontMatter = require('gulp-front-matter');
var config      = require('../config');

function renderHtml(locale, onlyChanged) {
    locale = typeof locale === 'string' ? locale : '';
    return gulp
        .src([config.src.templates + '/**/[^_]*.html'])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(data(function(file) {
            var pathToData = path.join(config.src.templatesData, locale, 'data.json');
            return JSON.parse(fs.readFileSync(pathToData, 'utf-8'));
        }))
        .pipe(swig({
            load_json: true,
            json_path: config.src.templatesData + '/' + locale,
            data: {
                LANG: locale
            },
            defaults: {
                cache: false
            }
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: true,
            // unformatted: [],
            end_with_newline: true
        }))
        .pipe(gulpif(locale !== config.defaultLocale, rename({
            suffix: '-' + locale
        })))
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('swig', function(cb) {
    config.locales.forEach(function(locale) {
        renderHtml(locale);
    });
    cb();
});

gulp.task('swig:changed', function(cb) {
    config.locales.forEach(function(locale) {
        renderHtml(locale, true);
    });
    cb();
});

gulp.task('swig:watch',  function() {
    gulp.watch([
        config.src.templates + '/**/[^_]*.html'
    ], ['swig:changed']);

    gulp.watch([
        config.src.templates + '/**/_*.html',
        config.src.templatesData + '/**/*.json'
    ], ['swig']);
});
