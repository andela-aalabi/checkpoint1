const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const Server = require('karma').Server;

const htmlSource = './index.html';
const cssSource = './src/stylesheet.css';
const jsSource = './src/controller/app.js';

gulp.task('connect', () => {
  connect.server({
    root: ['./'],
    port: 1337,
    livereload: true,
  });
});

gulp.task('open', () => {
  gulp.src(__filename)
  .pipe(open({ uri: 'http://localhost:1337' }));
});

gulp.task('html', () => {
  gulp.src(htmlSource)
  .pipe(connect.reload());
});

gulp.task('css', () => {
  gulp.src(cssSource)
  .pipe(connect.reload());
});

gulp.task('js', () => {
  gulp.src(jsSource)
  .pipe(connect.reload());
});

gulp.task('scripts', () => {
  gulp.src(['./jasmine-standalone-2.5.2/spec/invertedIndex.spec.js'])
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./jasmine-standalone-2.5.2/build'));
});

/**
 * Run test once and exit
 */
gulp.task('test', (done) => {
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true,
  }, done).start();
});

gulp.task('watch', () => {
  gulp.watch(htmlSource, ['html']);
  gulp.watch(cssSource, ['css']);
  gulp.watch(jsSource, ['js']);
  gulp.watch('./src/model/invertedIndex.js', ['scripts']);
  gulp.watch('./jasmine-standalone-2.5.2/spec/invertedIndex.spec.js', ['scripts']);
});

gulp.task('default',
  ['scripts', 'test', 'html', 'css', 'js', 'open', 'connect', 'watch']);
