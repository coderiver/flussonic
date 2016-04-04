var gulp        = require('gulp');
var swig        = require('gulp-swig');
var plumber     = require('gulp-plumber');
var gulpif      = require('gulp-if');
var rename      = require('gulp-rename');
var changed     = require('gulp-changed');
var prettify    = require('gulp-prettify');
var frontMatter = require('gulp-front-matter');
var config      = require('../config');
var fs = require('fs');


function extend(target) {
  'use strict';
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function(source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        target[prop] = source[prop];
      }
    }
  });
  return target;
}


function renderHtml(locale, onlyChanged) {
    locale = typeof locale === 'string' ? locale : '';
    return gulp
        .src([config.src.templates + '/**/[^_]*.html'])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(swig({
            load_json: true,
            json_path: config.src.templatesData + '/' + locale,
            data: function() {
                var l = {LANG: locale};
                var default_path = config.src.templatesData + '/' + locale + "/data.json";
                return extend(JSON.parse(fs.readFileSync(default_path)), l);
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
