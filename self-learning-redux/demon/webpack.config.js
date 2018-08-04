
/** 编译出html的插件 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
/** 抽离css文件的插件 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/** 删除打包文件的插件 */
const CleanWebpackPlugin = require('clean-webpack-plugin');

var webpack = require('webpack')
var path = require('path')


let pathsToClean = [
  'dist',
]

var stage = process.env.NODE_ENV;


module.exports = {
  entry: {
    "app": './src/app.js',
    "log": './src/log.js',
    "tmp": './src/tmp.js',
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),

    new HtmlWebpackPlugin({
      template: './src/app.html',
      filename: 'app.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      excludeChunks: ['log']
    }),

    new HtmlWebpackPlugin({
      template: './src/log.html',
      filename: 'log.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['log']
    }),

    new HtmlWebpackPlugin({
      template: './src/tmp.html',
      filename: 'tmp.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['tmp']
    }),

    new ExtractTextPlugin({
      filename: 'style.css',

      /** 热替换的时候就加上, 编译时去掉 */
      disable: true
    }),

    /** 热替换 */
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },{
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },{ 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/ 
      },{ 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      },{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ]
      }
    ]
  }
};