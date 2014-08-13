'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var cover = require('gulp-coverage');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

/**
* Test
*/

gulp.task('test', function () {
  return gulp.src('./test/*.test.js')
    .pipe(mocha({ reporter: 'spec' }));
});

/*
 * Coverage
 */

gulp.task('coverage-generate', function () {
  return gulp.src('./test/*.test.js')
    .pipe(cover.instrument({
      pattern: ['./lib/*.js'],
      debugDirectory: 'debug'
    }))
    .pipe(mocha())
    .pipe(cover.report({
      outFile: 'coverage.html'
    }));
});

gulp.task('coverage-clean', ['coverage-generate'], function () {
  return gulp.src(['./.coverdata/', './.coverrun', './debug/'])
    .pipe(clean());
});


gulp.task('coverage', ['coverage-generate', 'coverage-clean']);

/**
 * JSHint
 */

gulp.task('jshint', function () {
  gulp.src('./{lib,test}/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});


/**
 * Super Tasks
 */

gulp.task('default', ['all'], function () {
  process.exit();
});

gulp.task('all', ['test', 'jshint'], function (callback) {
  //Very important we run coverage afterwards or it crashes
  //some unit tests.
  runSequence('coverage', function() {
    callback();
  });
});
