var gulp = require('gulp')
var babel = require('gulp-babel')

var concat = require('gulp-concat')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var minify = require('gulp-minify-css')


var location = [
	'app/**/*.js'
]

var lib = [
	'lib/**/*.js',
	'!lib/**/*.min.js'
]

gulp.task('default', ['build'])

gulp.task('build-all', ['build', 'build-lib'])

gulp.task('build', function () {
	gulp.src(location)
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(babel({ presets: ['es2015', 'stage-0'] }))
		.on('error', gutil.log.bind(gutil))
		.pipe(concat('bundle.min.js'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/'))
})

gulp.task('build-lib', function () {
	gulp.src(lib)
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('lib/'))
})

gulp.task('watch', ['build'], function (){
	gulp.watch(location, ['default'])
})