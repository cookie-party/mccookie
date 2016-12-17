import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config.js';

gulp.task('webpack', ()=> {
  return gulp.src('./public/src/*.jsx')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(''));
});

gulp.task('watch', ()=>{
  gulp.watch(['./public/src/**/*.js','./public/src/**/*.jsx'], ['webpack']);
});

gulp.task('default', ['webpack', 'watch']);

