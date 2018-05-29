const browserify = require('browserify');
babelify = require('babelify'),
gulp = require('gulp-help')(require('gulp'));
source = require('vinyl-source-stream'),
util = require('gulp-util'),
connect = require('gulp-connect'),
pump = require('pump'),
runSequence = require('run-sequence');
exec = require('child_process').exec;
prettier = require('gulp-prettier'),
watch = require('gulp-watch'),
http = require('http');

// Basic usage
gulp.task('browserify1', 'rend le code serveur utilisable dans un navigateur', function(cb) {
  pump([
    browserify({entries: './app/public/morpion/game.js', debug: true}).bundle(),
    source('bundle_morpion_game.js'),
    gulp.dest('./app/public/morpion'),
    connect.reload()
  ], cb)
});

gulp.task('browserify2', 'rend le code serveur utilisable dans un navigateur', function(cb) {
  pump([
    browserify({entries: './app/public/puissance4/game.js', debug: true}).bundle(),
    source('bundle_puissance4_game.js'),
    gulp.dest('./app/public/puissance4'),
    connect.reload()
  ], cb)
});

gulp.task('webserver', 'lance le front', function(cb) {
  connect.server({root: 'app/public/', livereload: true});
});

gulp.task('server', 'lance le serveur', function(cb) {
  "use strict";
  let child = exec('node app/app.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

  });
  child.stdout.on('data', function(data) {
    console.log(data.toString());
  });
  cb();
});

gulp.task('prettier', 'met en forme les fichiers - en cours', function(cb) {
  pump([
    gulp.src('./app/public/morpion/*.js'),
    prettier({singleQuote: true}),
    gulp.dest('./dist/js')
  ], cb)
});

gulp.task('default', function() {
  gulp.watch(['./app/public/morpion/game.js'], ['browserify1']);
  gulp.watch(['./app/public/puissance4/game.js'], ['browserify2']);

  runSequence('browserify1', 'browserify2', 'server', 'webserver');
});
