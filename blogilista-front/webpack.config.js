const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {
  const backendUrl = argv.mode === 'production'
    ? undefined
    : 'http://localhost:3003'

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      historyApiFallback: {
        index: '/index.html'
      }
    },
    devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html.template',
        inject: false
      }),
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backendUrl)
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}

module.exports = config
