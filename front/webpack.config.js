const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/html/index.html",
  filename: "./index.html"
});

module.exports = {
  devServer: {
        watchOptions: {
            poll: true
        }
  },
  devtool : 'source-map',
  stats : {
    errorDetails : true
  },
  performance: {
    hints: false
  },
  entry: ['babel-polyfill', './src/js/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        },
        {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
