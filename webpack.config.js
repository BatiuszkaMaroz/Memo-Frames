const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/scripts/app.js',
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        //Babel polyfill
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3.6 } },
              ],
            ],
          },
        },
      },
      {
        //Sass loader
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        //SVG loader
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      },
      {
        //Images loader
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: (url, resourcePath, context) => {
            //url is a name of file
            //resourcePath is an absolute path
            //context is THIS folder

            // To get relative path you can use
            // const relativePath = path.relative(context, resourcePath);

            if (/icon.*\.png$/.test(url)) {
              return `images/icons/${url}`;
            }

            return `images/${url}`;
          },
        },
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      chunks: ['app'],
      filename: 'index.html',
      template: './src/index.html',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defer: ['app'],
    }),
  ],
};
