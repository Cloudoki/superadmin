var fs = require('fs');

// Include gulp & del
var gulp = require('gulp');
var del = require('del');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var runSequence = require('run-sequence');
var fc2json = require('gulp-file-contents-to-json');
var modify = require('gulp-modify');

var dirs = {
    source: 'src',
    staging: 'staging',
    release: 'dist'
}

// Use example config if no config is present
gulp.task('copy:config', function () {
    try {
        fs.accessSync(dirs.source +'/js/config.js', fs.F_OK);
    } catch (err) {
        gulp.src(dirs.source + '/js/config-default.js')
            .pipe(rename('config.js'))
            .pipe(gulp.dest(dirs.release + '/js/'));
    }
});

// Clean
gulp.task('clean', function (cb) {
    del([dirs.release], cb);
});

// Copy files
gulp.task('copy:html', function() {
    return gulp.src(dirs.source+'/*.html')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:images', function() {
    return gulp.src(dirs.source+'/images/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});
gulp.task('copy:scripts', function() {
    return gulp.src([
            dirs.source+'/vendor/jquery/dist/jquery.min.js',
            dirs.source+'/vendor/backbone/backbone-min.js',
            dirs.source+'/vendor/bootstrap/dist/css/bootstrap.min.css',
            dirs.source+'/vendor/bootstrap/dist/js/bootstrap.min.js',
            dirs.source+'/vendor/underscore/underscore-min.js',
            dirs.source+'/vendor/requirejs/require.js',
            dirs.source+'/vendor/mustache.js/mustache.js',
            dirs.source+'/vendor/backgrid/lib/backgrid.min.js',
            dirs.source+'/vendor/backgrid/lib/backgrid.min.css',
            dirs.source+'/js/**/*'
        ]).pipe(copy(dirs.release, {prefix: 1}));
});
// Copy dummy data
gulp.task('copy:dummy', function() {
    return gulp.src(dirs.source+'/js/dummy/*')
        .pipe(copy(dirs.release, {prefix: 1}));
});
// Lint Tasks
gulp.task('lint:before', function() {
    return gulp.src(dirs.source+'/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// Mustache template concat
gulp.task('mustache', function(){
    gulp.src(dirs.source+'/templates/**/*')
        //.pipe(minifyHTML())
        .pipe(fc2json('templates.js'))
        .pipe(modify({
            fileModifier: function(file, contents) {
                    return "Templates = "+contents;
                }
        }))
        .pipe(gulp.dest(dirs.release+'/templates'));
});
// Compile Sass
gulp.task('sass', function() {
    return gulp.src(dirs.source+'/css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(dirs.release+'/css'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(dirs.source+'/*.html', ['copy:html']);
    gulp.watch(dirs.source+'/js/**/*', ['copy:scripts', 'lint:before']);
    gulp.watch(dirs.source+'/css/**/*', ['sass']);
    gulp.watch(dirs.source+'/templates/**/*', ['mustache']);
    gulp.watch(dirs.source+'/js/Dummy/*', ['copy:dummy']);
});

// Build and release tasks
gulp.task('release', function(callback){
    runSequence('clean', ['copy:config', 'copy:images', 'copy:dummy', 'copy:html', 'copy:scripts', 'sass', 'mustache'], callback);
});
gulp.task('build', function(callback){
    runSequence('clean', ['copy:config', 'copy:images', 'copy:dummy', 'copy:html', 'copy:scripts', 'sass', 'lint:before', 'mustache'], callback);
});
gulp.task('default', ['build', 'watch']);
