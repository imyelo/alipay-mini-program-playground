const { resolve } = require('path')
const webpack = require('webpack')
const MinaEntryPlugin = require('@tinajs/mina-entry-webpack-plugin')
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')
const translate = require('@tinajs/translator-ant')
const rev = require('git-rev-sync')

const pkg = require('./package.json')

const isProduction = process.env.NODE_ENV === 'production'
const CDN_PREFIX = 'https://static.sodalife.xyz/soda/mini/ant/tmp/'

const loaders = {
  script: 'babel-loader',
  style: {
    loader: 'postcss-loader',
    options: {
      config: {
        path: resolve('./postcss.config.js'),
      },
    },
  },
}

let version = 'v0.0.0'
try {
  version = rev.isTagDirty() ? `${rev.tag()}-${rev.short('.')}` : rev.tag()
} catch (error) {}

module.exports ={
  context: resolve('src'),
  entry: './app.mina',
  output: {
    path: resolve('dist/ant'),
    filename: '[name]',
    publicPath: '/',
    globalObject: 'my',
  },
  module: {
    rules: [
      {
        test: /\.mina$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@tinajs/mina-loader',
            options: translate({
              loaders,
            }),
          },
        ],
      },
      {
        test: /\.mina$/,
        include: /node_modules/,
        use: [
          {
            loader: '@tinajs/mina-loader',
            options: translate({})
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          resolve('src/libraries/tina-router'),
          resolve('src/libraries/tina-loading'),
        ],
        use: loaders.script,
      },
      {
        test: /\.(css|wxss)$/,
        exclude: /node_modules/,
        use: loaders.style,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        oneOf: [
          {
            include: [
              resolve('src/vendors'),
            ],
            use: {
              loader: 'file-loader',
              options: {
                name: '[path]/[name].[ext]',
              },
            },
          },
          {
            use: {
              loader: 'file-loader',
              options: isProduction ? {
                name: '[name].[hash:6].[ext]',
                outputPath: '../assets',
                publicPath: CDN_PREFIX,
              } : {
                name: 'assets/[name].[hash:6].[ext]',
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        oneOf: [
          {
            include: [
              resolve('src/vendors'),
            ],
            use: {
              loader: 'file-loader',
              options: {
                name: '[path]/[name].[ext]',
              },
            },
          },
          {
            use: {
              loader: 'file-loader',
              options: {
                name: 'assets/[name].[hash:6].[ext]',
              },
            },
          },
        ],
      },
      {
        test: /\.wxs$/,
        use: {
          loader: 'relative-file-loader',
          options: {
            name: 'wxs/[name].[hash:6].[ext]',
          },
        },
      },
      {
        test: /\.wxml$/,
        use: [{
          loader: 'relative-file-loader',
          options: {
            name: 'wxml/[name].[hash:6].[ext]',
          },
        }, {
          loader: '@tinajs/wxml-loader',
          options: {
            raw: true,
          },
        }],
      },
    ],
  },
  resolve: {
    symlinks: true,
    alias: {
      '@': resolve('src'),
      'Tina': '@tinajs/tina/lib/ant/tina.js',
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new webpack.DefinePlugin({
      __ENV__: {
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        BUILT_AT: JSON.stringify(+new Date()),
        PKG_NAME: JSON.stringify(pkg.name),
        VERSION: JSON.stringify(version),
      },
    }),
    new MinaEntryPlugin(),
    new MinaRuntimePlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common.js',
      minChunks: 2,
      minSize: 0,
    },
    runtimeChunk: {
      name: 'runtime.js',
    },
  },
  mode: isProduction ? 'production' : 'none',
}
