//include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
  replaceString: /\bgulp[\-.]/
});
var mainBowerFiles = require('main-bower-files');
var resourceDest = '/public';

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./public/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./public/app/**/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./public/build'));
});

gulp.task('less', function(callback) {
  return gulp.src('./public/stylesheets/styles.less')
  .pipe(less({
    paths: ['./public/stylesheets/styles.less']
  }))
  .pipe(gulp.dest('./public/build'));
  }
);

// CSS concat, auto-prefix and minify
gulp.task('styles', ['less'], function() {
  gulp.src(['./public/stylesheets/styles.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/build'));
});

gulp.task('jsresources', function(){
  var jsFiles = ['src/js/*'];
 	gulp.src(plugins.mainBowerFiles().concat(jsFiles))
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));
});

gulp.task('default', [
  'scripts',
  'less',
  'styles'
  ],
  function(){
    gulp.watch('./public/app/**/*.js', function() {
      gulp.run('jshint', 'scripts');
    });
    gulp.watch(['./public/stylesheets/*.less', './public/stylesheets/less/*.less',
    './public/stylesheets/less/**/*.less'], function() {
      gulp.run('less');
      gulp.run('styles');
    });
  }
);
