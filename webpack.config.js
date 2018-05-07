const path = require('path');
// const webpack = require('webpack');
// const WebpackDashboard = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV !== 'production';

module.exports = {
  // entry file for react
  entry: './src/index.js',
  // where the compiled code goes
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  // loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // (RegEXP) anything that is .js/.jsx will be compiled by babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // allows importing/using css files (if I don't want to use styled-jsx)
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      // allows image support in .js files
      // creates an /images folder in /build when application is built
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash]_[name].[ext]',
              outputPath: 'images/',
            },
          },
          // compress images
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
    ],
  },
  // creates the template for the index.html file that react is injected into
  plugins: [
    new FriendlyErrorsWebpackPlugin(), // easier to read error messages
    new CleanWebpackPlugin(['build']), // deletes the build folder in between builds
    // points to the file where react is injected
    new HtmlWebpackPlugin({
      title: 'PixaBay Image Finder',
      hash: true,
      template: './src/index.html', // Load a custom template
    }),
    // new WebpackDashboard(), // enhanced dev experience with a cli
  ],
  // webpack-dev-server options
  devServer: {
    port: 3001,
    quiet: true, // turns off webpack output including error message because FriendlyErrorsWebpackPlugin is enabled
  },
  performance: {
    hints: false, // disable performance warnings
  },
  devtool: DEV_MODE ? 'inline-source-map' : 'source-map',
};
