import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import env from 'gulp-env';
import nodemon from 'gulp-nodemon';

//クライアント側のwebpack
gulp.task('webpack', ()=> {
  return gulp.src(['./public/src/client/*.jsx','./public/src/login/*.jsx'])
  .pipe(webpack({config: webpackConfig}))
  .pipe(gulp.dest('./public/dist/'));
});

//サーバサイドのbabel
gulp.task('ssr', ()=> {
  return gulp.src('./public/src/ssr/*.jsx')
  .pipe(babel({
    presets: ['es2015','react']
  }))
  .pipe(gulp.dest('./public/dist/'));
});

//サーバサイドのbabel
gulp.task('app', ()=> {
  return gulp.src('./app.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./lib/'));
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
  gulp.watch(['./app.js','./public/src/**/*.js','./public/src/**/*.jsx'], ['webpack', 'app', 'ssr']);
});

gulp.task('default', ['webpack', 'app', 'ssr', 'run', 'watch']);

