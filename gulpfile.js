var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream');

var paths = {
  sass: ['./client/scss/**/*.scss'],
  js: ['./client/www/**/*.js', '!./client/www/{lib,lib/**}', '!./client/www/js/app.js'],
  dist: {
    css: './client/www/css/',
    pub: './client/www/',
  }
};

var cssFiles = gulp.src('./scss/ionic.app.scss')
  .pipe(sass())
  .pipe(gulp.dest(paths.dist.css))
  .pipe(minifyCss({
    keepSpecialComments: 0
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest(paths.dist.css))
  ;

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./client/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest(paths.dist.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(paths.dist.css))
    .on('end', done);
});

gulp.task('build', function(done) {
  gulp.src(paths.dist.pub + 'index.html')
  .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', relative: true}))
  .pipe(inject(es.merge(
    cssFiles,
    gulp.src(paths.js, {read: false})
  ), {relative: true}))
  .pipe(gulp.dest(paths.dist.pub));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
