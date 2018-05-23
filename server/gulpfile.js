const gulp = require('gulp-help')(require('gulp')),
      pump = require('pump'),
      jshint = require('gulp-jshint'),
      connect = require('gulp-connect'),
      runSequence = require('run-sequence');

gulp.task('lint', 'Analyze JS code with JSHint', function (cb) {
    pump([
        gulp.src('*.js'),
    		jshint(),
    		jshint.reporter('default')
      ],
    	cb
      );
    });

gulp.task('webserver', 'Launch webserver including livereload', function(cb) {
    gulp.watch(['./src/app/*.html'], ['app']);
    gulp.watch(['./src/assets/js/*.js'], ['js']);
    gulp.watch(['./src/assets/css/*.scss'], ['scss']);
  	connect.server({
  		root: 'dist',
  		livereload: true
  	});
  });

gulp.task('default', function(cb){
  runSequence('lint', 'webserver', function() {
    done();
  });
});
