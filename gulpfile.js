// based on:
// http://travismaynard.com/writing/getting-started-with-gulp

var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');

// don't really need sass or concat
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var imageop = require('gulp-image-optimization');



gulp.task('images', function(cb) {
	gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg'])
              .pipe(imageop({coptimizationLevel: 5,
	                progressive: true,
			interlaced: true
			})).pipe(gulp.dest('./images')).on('end', cb).on('error', cb);
    });

gulp.task('pizza-images', function(cb) {
        gulp.src(['views/images-src/*.png','views/images/*.jpg','views/images/*.gif','views/images/*.jpeg'])
	    .pipe(imageop({coptimizationLevel: 5,
			    progressive: true,
			    interlaced: true
			    })).pipe(gulp.dest('./views/images')).on('end', cb).on('error', cb);
    });

gulp.task('lint', function() {
	return gulp.src('js/*.js')
	    .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

gulp.task('compress', function() {
	gulp.src('./js/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('./dist/css/'))
});


gulp.task('scripts', function() {
	return gulp.src('js/*.js')
	    .pipe(concat('all.js'))
	    .pipe(gulp.dest('dist'))
	    .pipe(rename('all.min.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('dist/js/'));
    });

gulp.task('minify-css', function() {
	gulp.src('./css/*.css')
	    .pipe(minifyCSS({keepBreaks:false}))
	    .pipe(rename(function (path) {
                 path.basename += ".min";
	    }))
	    .pipe(gulp.dest('./dist/css'))
});

gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('css'));
    });

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch('css/*.css', ['minify-css']);

	// no sass in this project
	// gulp.watch('scss/*.scss', ['sass']);
    });


gulp.task('default', ['lint', 'minify-css', 'compress', 'images', 'pizza-images', 'watch']);

/*
gulp.task('default', function() {
 // write tasks here
});
*/

