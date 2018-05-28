const browserify = require('browserify');
babelify = require('babelify'),
gulp = require('gulp-help')(require('gulp'));
source = require('vinyl-source-stream'),
util = require('gulp-util'),
connect = require('gulp-connect'),
pump = require('pump'),
runSequence = require('run-sequence');
exec = require('child_process').exec;
prettier = require('gulp-prettier');

// Basic usage
gulp.task('browserify', 'rend le code serveur utilisable dans un navigateur', function(cb) {
  pump([
    browserify({entries: './app/public/morpion/draw.js', debug: true}).bundle(),
    source('bundle_morpion_draw.js'),
    gulp.dest('./app/public/morpion'),
    connect.reload()
  ], cb)
});

gulp.task('webserver','lance le front', function(cb) {
  gulp.watch(['./app/public/morpion/draw.js'], ['browserify']);
  connect.server({root: 'app/public/', livereload: true});
})

gulp.task('server', 'lance le serveur - en cours', function(cb) {
  exec('node app/app.js', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('prettier', 'met en forme les fichiers - en cours', function(cb){
  pump([
     gulp.src('./app/public/morpion/*.js'),
     prettier({ singleQuote: true }),
     gulp.dest('./dist/js')
  ], cb)
});

gulp.task('default', function() {
  runSequence('browserify', 'webserver');
});
