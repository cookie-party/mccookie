import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import env from 'gulp-env';
import nodemon from 'gulp-nodemon';
import sass from 'gulp-sass';

gulp.task('webpack', ()=> {
  return gulp.src('./public/src/*.jsx')
  .pipe(webpack({config:webpackConfig}))
  .pipe(gulp.dest(''));
});

gulp.task('ssr', ()=> {
  return gulp.src('./public/src/ssr/*.jsx')
  .pipe(babel({
    presets: ['es2015','react']
  }))
  .pipe(gulp.dest('./public/dist/'));
});

gulp.task('sass', ()=>{
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('run', ()=> {
  env({
    file: '.env.json'
  });
  nodemon({
    script: './bin/www',
    ext: 'js',
    stdout: true,
    env: {
      NODE_ENV: 'development'
    }
  });
});

gulp.task('watch', ()=>{
  gulp.watch([
    './public/src/**/*.js',
    './public/src/**/*.jsx',
    './public/sass/**/*.scss',
  ], ['webpack', 'ssr', 'sass']);
});

gulp.task('default', ['webpack', 'ssr', 'sass', 'run', 'watch']);

