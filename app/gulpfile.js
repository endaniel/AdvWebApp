var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');
//var debug = require('gulp-debug');

var javascriptsGlobPattern = 'public/js/**/*.js';
var cssGlobPattern = 'public/style/**/*.css';
var minifiedJavascriptsPath = 'public/build/javascripts';
var minifiedCssPath = 'public/build/stylesheets';

// delete the build folder
gulp.task('clean', function() {
    return gulp.src('public/build', {
        read: false
    })
        .pipe(clean());
});

// lint the js sources (check for missing ; etc.)
gulp.task('lint', function() {
    return gulp.src(['routes/*.js', 'app.js', javascriptsGlobPattern])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

// concat 3rd party javascripts
// we use only minified versions of 3rd party libraries,
// so no need to minify them.
gulp.task('concat-components', ['clean'], function() {
    return gulp.src(['public/bower_components/angular/angular.min.js','public/bower_components/**/*.min.js'])
        .pipe(concat('components.js'))
        .pipe(gulp.dest('public/build/components'));
});

// concat our css files
gulp.task('build-css', ['clean'], function() {
    return gulp.src(cssGlobPattern)
        .pipe(concat('Ex5.css'))
        .pipe(gulp.dest(minifiedCssPath));
});

// concat and uglify our javascripts
gulp.task('build-js', ['clean', 'lint'], function() {
    return gulp.src(javascriptsGlobPattern)
        .pipe(ngAnnotate())
        .pipe(concat('Ex5.js'))
        .pipe(uglify())
        .pipe(gulp.dest(minifiedJavascriptsPath));
});

// inject <script> and <stylesheets> tags for dev
gulp.task('inject-dev', ['concat-components'], function() {
    var target = gulp.src('public/main.html');
    var sources = gulp.src(['public/build/components/components.js',javascriptsGlobPattern, cssGlobPattern, 'public/bower_components/bootstrap/dist/css/bootstrap.css']);
    //.pipe(angularFileSort());

    return target.pipe(inject(sources, {
        relative: true
    }))
        .pipe(gulp.dest('./public'));
});

// inject <script> and <stylesheets> tags for prod
gulp.task('inject-prod', ['build-js', 'build-css', 'concat-components'], function() {
    var target = gulp.src('public/main.html');
    var sources = gulp.src(['public/build/components/components.js',minifiedJavascriptsPath + '/**/*.js'], {
        read: false
    });

    return target.pipe(inject(sources, {
        relative: true
    }))
        .pipe(gulp.dest('./public'));
});

// start a local server and listen to changes to html and js files
/*gulp.task('serve', function() {
    nodemon({
        script: 'bin/www',
        ext: 'html js'
    })
        .on('change', ['lint'])
        .on('restart', function() {
            console.log('restarted!')
        })
});*/

// master build tasks
gulp.task('dev', ['inject-dev'], function() {});
gulp.task('build', ['inject-prod'], function() {});
gulp.task('default', ['build'], function() {});