import path from 'path';
import webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

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
  target: 'node',
  devServer: {
    devtool: true,
    colors: true,
    progress: true,
    host: '0.0.0.0',
  },
};

if (isProduction) {
  config.entry = {
    index: './src/Comments.jsx',
  };

  config.output.libraryTarget = 'umd';
  config.output.library = 'disgess';

  config.externals = {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
    moment: {
      root: 'Moment',
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
    },
  };

  config.output.path = './';
}

export default config;
