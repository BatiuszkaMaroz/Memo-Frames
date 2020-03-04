const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const ManifestConfig = {
  name: 'MemoFrames',
  short_name: 'MemoFrames',
  description: 'Capture your memories in a frame...',
  background_color: '#22a6b3',
  theme_color: '#22a6b3',
  crossorigin: 'use-credentials',
  display: 'standalone',
  inject: true,
  fingerprints: true,
  ios: true,
  icons: [
    {
      src: path.resolve('src/assets/icons/ios-icon-512x512.png'),
      sizes: [120, 152, 167, 180, 1024],
      destination: path.join('icons', 'ios'),
      ios: true,
    },
    {
      src: path.resolve('src/assets/icons/ios-icon-1024x1024.png'),
      size: 1024,
      destination: path.join('icons', 'ios'),
      ios: 'startup',
    },
    {
      src: path.resolve('src/assets/icons/a-icon-512x512.png'),
      sizes: [36, 48, 72, 96, 144, 192, 256, 384, 512],
      destination: path.join('icons', 'android'),
    },
  ],
};

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
          outputPath: 'images',
          // outputPath: (url, resourcePath, context) => {
          //   //url is a name of file
          //   //resourcePath is an absolute path
          //   //context is THIS folder

          //   // To get relative path you can use
          //   // const relativePath = path.relative(context, resourcePath);

          //   if (/icon.*\.png$/.test(url)) {
          //     return;
          //   }

          //   return `images/${url}`;
          // },
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
    new CopyPlugin([
      {
        from: './src/scripts/utils/idb.js',
        to: 'scripts/idb.js',
        transform(content) {
          return content.toString().replace(/export /g, '');
        },
      },
    ]),
    new WebpackPwaManifest(ManifestConfig),
    new InjectManifest({
      swSrc: './sw-base.js',
      swDest: 'sw.js',
    }),
  ],
};
