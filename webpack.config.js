const { join } = require('path');


const styleLoaders = [
  {
    loader: 'style-loader',
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
      paths: 'src',
    },
  },
];

module.exports = {
  entry: {
    hook: './app/src/hook',
    backend: './app/src/backend',
    devtools: './app/src/devtools',
    "devtools-background": './app/src/devtools-background',
    background: './app/src/background.js',
    detector: './app/src/detector.js',
  },
  output: {
    path: join(__dirname, './app/build'),
    filename: '[name].js'
  },
  devtool: process.env.NODE_ENV !== 'production'
    ? '#inline-source-map'
    : false,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
      },
      {
        test: /\.(css|less)$/,
        use: styleLoaders
      },
    ]
  },
  mode: 'development'
}