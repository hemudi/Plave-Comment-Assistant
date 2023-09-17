const path = require('path');

const ROOT_DIR_NAME = path.resolve(__dirname, '../');
const SRC_DIR_NAME = path.resolve(ROOT_DIR_NAME, 'src');
const OUTPUT_DIR_NAME = path.resolve(ROOT_DIR_NAME, 'dist');
const PUBLIC_DIR_NAME = path.resolve(ROOT_DIR_NAME, 'public');
const HTML_TEMPLATE_NAME = path.resolve(PUBLIC_DIR_NAME, 'index.html');

const DotenvPlugin = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve(SRC_DIR_NAME, 'contexts/popup/index.tsx'),
    serviceWorker: path.resolve(SRC_DIR_NAME, 'contexts/serviceWorker/index.ts'),
    contentScript: path.resolve(SRC_DIR_NAME, 'contexts/contentScript/index.ts'),
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_DIR_NAME,
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@constants': path.resolve(SRC_DIR_NAME, 'constants/'),
      '@contexts': path.resolve(SRC_DIR_NAME, 'contexts/'),
      '@utils': path.resolve(SRC_DIR_NAME, 'utils/'),
      '@store': path.resolve(SRC_DIR_NAME, 'store/'),
      '@styles': path.resolve(SRC_DIR_NAME, 'styles/'),
      '@popup': path.resolve(SRC_DIR_NAME, 'contexts/popup/'),
      '@serviceWorker': path.resolve(SRC_DIR_NAME, 'contexts/serviceWorker/'),
      '@contentScript': path.resolve(SRC_DIR_NAME, 'contexts/contentScript/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new DotenvPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      overrideConfigFile: path.resolve(ROOT_DIR_NAME, '.eslintrc'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: PUBLIC_DIR_NAME,
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: HTML_TEMPLATE_NAME,
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
};
