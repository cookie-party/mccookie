module.exports = [{
  entry: './public/src/client/index.jsx',
  output: {
    path: require('path').resolve('./public/dist/'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /\/public\/src\/lib\//]
      }
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
},{
  entry: './public/src/login/index.jsx',
  output: {
    path: require('path').resolve('./public/dist/'),
    filename: 'login.js'
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /\/public\/src\/lib\//]
      }
    ],
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}];