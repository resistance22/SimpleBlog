const path = require('path')

module.exports = {
  entry: {
    home: path.resolve(__dirname, 'client', 'index.js'),
    admin: path.resolve(__dirname, 'client', 'admin', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
