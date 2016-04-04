var gulp        = require('gulp');
var swig        = require('gulp-swig');
var plumber     = require('gulp-plumber');
var gulpif      = require('gulp-if');
var rename      = require('gulp-rename');
var changed     = require('gulp-changed');
var prettify    = require('gulp-prettify');
var frontMatter = require('gulp-front-matter');
var config      = require('../config');

// Reimports from gulp-swig
var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var ext = gutil.replaceExtension;


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
            data: function(file) {
                // Я отказался от использования механизма в gulp-swig, потому что он в неудобном
                // порядке накатывает файлы. Мне хотелось что бы локальный файл переопределял глобальный,
                // а в gulp-swig получалось наоборот
                var l = {LANG: locale};
                var default_path = config.src.templatesData + '/' + locale + "/data.json";
                var global_data = l;
                try {
                    global_data = extend(JSON.parse(fs.readFileSync(default_path)), l);
                } catch(err) {}
                var jsonPath = config.src.templatesData + '/' + locale + "/" + ext(path.basename(file.path), '.json');
                var localData = {};
                try {
                    localData = JSON.parse(fs.readFileSync(jsonPath));
                } catch(err) {}
                return extend(global_data, localData);
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
        config.src.templates + '/**/[^_]*.html',
        config.src.templatesData + '/**/*.json'
    ], ['swig:changed']);

    gulp.watch([
        config.src.templates + '/**/_*.html',
        config.src.templatesData + '/**/*.json'
    ], ['swig']);
});
