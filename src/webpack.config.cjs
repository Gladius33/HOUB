const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './index.js', // Mise à jour pour correspondre à la structure classique React
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Utilisation de 'bundle.js' pour plus de clarté
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'], // Ajout du plugin pour éviter la duplication des helpers Babel
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Gestion des fichiers CSS
      },
      {
        test: /\.(png|jpg|gif)$/i, // Ajout du support pour les images
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs'], // Ajout explicite de .mjs pour résoudre ce type de fichier
    alias: {
      process: 'process/browser.js', // Ajout de l'extension .js explicite
    },
    fallback: {
      vm: require.resolve('vm-browserify'),
      process: require.resolve('process/browser.js'), // Référence explicite à browser.js
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      constants: require.resolve('constants-browserify'),
      zlib: require.resolve('browserify-zlib'),
      fs: false, // Ces modules ne sont pas nécessaires dans un environnement navigateur
      tls: false,
      net: false,
      dns: false,
      child_process: false,
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 8080,
    historyApiFallback: true,
    open: true, // Ouverture automatique du navigateur lors du lancement du serveur
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../public/index.html', // Mise à jour du chemin de template HTML pour correspondre à la structure de projet
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js', // Référence explicite à browser.js
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /config/,
    }),
  ],
  devtool: 'source-map', // Ajout des sourcemaps pour un meilleur débogage
};
