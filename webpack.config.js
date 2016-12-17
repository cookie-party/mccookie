module.exports = {
  entry: './public/src/index.jsx',
  output: {
    filename: './public/dist/bundle.js'
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
};