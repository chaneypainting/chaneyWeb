var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var rimraf = require('gulp-rimraf');

gulp.task('clean', function() {
    return gulp.src('site.css', { read: false })
        .pipe(rimraf());
});

gulp.task('sass', function () {
	return gulp.src('site.scss')
        .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('.'));
});

gulp.task('watchSass', function() {
    gulp.watch('site.scss', ['clean', 'sass'])
});
