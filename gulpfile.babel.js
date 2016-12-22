import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config.js';
import env from 'gulp-env';
import nodemon from 'gulp-nodemon';

gulp.task('webpack', ()=> {
  return gulp.src('./public/src/*.jsx')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(''));
});

gulp.task('ssr', ()=> {
  return gulp.src('./public/src/ssr/*.jsx')
  .pipe(babel({
    presets: ['es2015','react']
  }))
  .pipe(gulp.dest('./public/dist/'));
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
  gulp.watch(['./public/src/**/*.js','./public/src/**/*.jsx'], ['webpack', 'ssr']);
});

gulp.task('default', ['webpack', 'ssr', 'run', 'watch']);

