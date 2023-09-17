const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/js/main.js',
        output: {
            filename: 'script.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                // {
                //     test: /\.m?js$/,
                //     exclude: /(node_modules|bower_components)/,
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: [['@babel/preset-env', {
                //                 debug: !isProduction,
                //                 corejs: 3,
                //                 useBuiltIns: 'usage',
                //             }]],
                //         },
                //     },
                // },
                // {
                //     test: /\.html$/,
                //     use: ["html-loader"],
                //   },
                //   {
                //     test: /\.js$/,
                //     exclude: /node_modules/,
                //   },
                //   {
                //     test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
                //     type: 'asset/resource',
                //   },
                //   {
                //     test: /\.(woff(2)?|eot|ttf|otf)$/i,
                //     type: 'asset/resource',
                //   },
                //   {
                //     test: /\.css$/i,
                //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
                //   },
                //   {
                //     test: /\.s[ac]ss$/i,
                //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                //   }
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html', // Путь к вашему HTML-файлу
                filename: 'index.html', // Имя выходного HTML-файла
            }),
            new HtmlWebpackPlugin({
              template: './src/modules.html', // Путь к вашему HTML-файлу
              filename: 'modules.html', // Имя выходного HTML-файла
          }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/assets', to: 'assets' }, // Копирование статических ресурсов
                ],
            }),
            new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        ],
        devtool: isProduction ? false : 'source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8080,
            open: true
        },
    };
};