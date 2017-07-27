var gulp        = require("gulp");
var prefixer     = require("gulp-autoprefixer");
var cssmin      = require("gulp-cssmin");
var rename      = require("gulp-rename");
var concat      = require("gulp-concat");
var babel       = require("gulp-babel");
var uglify      = require("gulp-uglify");
var imagemin    = require("gulp-imagemin");
var browserSync = require("browser-sync");
var sass        = require("gulp-sass");

// Task connect
gulp.task("connect", ["sass", "js"], function() {
  browserSync.init({
    server: "./"
  });
  gulp.watch("src/sass/*.scss", ["sass"]);
  gulp.watch("src/js/*.js", ["js"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
});

// Task SASS
gulp.task("sass", function() {
  return gulp.src("src/sass/*.scss")
  .pipe(prefixer("last 2 version"))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

// Task JS
gulp.task("js", function() {
  return gulp.src("src/js/*.js")
  .pipe(babel())
  .pipe(uglify())
  .pipe(concat("app.js"))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
});

// Task image
gulp.task("image", function() {
  return gulp.src("src/img/*.+(png|jpg|gif|svg)")
  .pipe(imagemin())
  .pipe(gulp.dest("dist/img"));
});

gulp.task("default", ["sass","js", "image", "connect"]);