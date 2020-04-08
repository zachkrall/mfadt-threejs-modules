const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'main.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    writeToDisk: true,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  }
}
