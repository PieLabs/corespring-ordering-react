var path = require('path');

module.exports = {
  entry: './entry.js', 
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          babelrc: false,
          presets: ['react', 'react-hmre'],
          plugins: ["syntax-decorators"]
        }
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      }
    ]
  }
};
