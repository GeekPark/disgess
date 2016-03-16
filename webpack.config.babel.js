import path from 'path';
import cssnext from 'postcss-cssnext';

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
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif)$/, loader: 'url?limit=25000' },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
    ],
  },
  postcss() {
    return [cssnext];
  },
  devServer: {
    devtool: true,
    colors: true,
    progress: true,
    host: '0.0.0.0',
  },
};

export default config;
