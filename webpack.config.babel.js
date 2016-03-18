import path from 'path';
import webpack from 'webpack';

const config = {
  context: __dirname,
  entry: {
    example: './src/example.js',
  },
  output: {
    path: 'dist/',
    filename: '[name].js',
  },
  resolve: {
    root: [
      path.join(__dirname, 'src/'),
    ],
    extensions: ['', '.js', '.jsx', '.css'],
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[local]-[hash:base64:5]!postcss-loader',
      },
    ],
  },
  postcss() {
    return [
      require('postcss-cssnext'),
      require('postcss-nesting'),
      require('postcss-selector-not'),
    ];
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  devServer: {
    devtool: true,
    colors: true,
    progress: true,
    host: '0.0.0.0',
  },
};

export default config;
