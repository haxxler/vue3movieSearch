//import
const path = require('path'); // Node.js에서 언제든지 사용할 수 있는 전역모듈
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
//const { pathToFileURL } = require('url');
//exports
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  // webpack은 html이 아닌 js파일을 진입점으로 설정
 
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },
 
  entry: './src/main.js',

  //결과물(번들)을 반환하는 설정
  output: {
    clean: true
  },

  module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        test:/\.s?css$/,
        use:[ // 아래의 작성순서는 지켜줘야 한다.
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test:/\.js$/,
        use:[
          'babel-loader'
        ]
      }, 
      {
        test:/\.(png|jpe?g|gif|webp)$/,
        use: [
          'file-loader'
        ] 
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns:[
        {from: 'static/'}
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer:{
      host: 'localhost'
  }

}