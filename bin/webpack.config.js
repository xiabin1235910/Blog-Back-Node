var nodeExternals = require('webpack-node-externals');
require("babel-polyfill");

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
}