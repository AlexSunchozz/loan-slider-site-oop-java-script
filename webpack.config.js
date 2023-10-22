const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Плагин для работы с HTML
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Плагин для того, чтобы сборка в папке dist всегда была свежей и файлы не кешировались
const CopyPlugin = require("copy-webpack-plugin"); // Плагин для копирования папок и файлов
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  config = {
    // Режим сборки проекта
    mode: "development",

    // Входная точка проекта
    entry: {
      main: "./src/js/index.js",
    },

    // Выходная точка проекта
    output: {
      filename: "[name].js", // Имя файла после сборки (можно использовать bondle.js, но для корректной сборки обычно используют [name].[contenthash].js для получения уникального имени итогового файла)
      path: path.resolve(__dirname, "build"), // Куда сохраняются файлы webpack
    },

    // Запуск локального сервера и открытие вкладки браузера (изменения в коде автоматически подтягиваются)
    devServer: {
      historyApiFallback: true,
      static: "./",
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },

    // Подключение модулей для обработки различных файлов
    module: {
      rules: [
        // Babel
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },

        // Файлы стилей
        {
          test: /\.css$/i,
          use: isProduction
            ? [MiniCssExtractPlugin.loader, "css-loader"]
            : ["style-loader", "css-loader"],
        },
        {
          test: /\.less$/i,
          use: isProduction
            ? [MiniCssExtractPlugin.loader, "css-loader"]
            : ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: isProduction
            ? [MiniCssExtractPlugin.loader, "css-loader"]
            : ["style-loader", "css-loader"],
        },

        // Файлы изображений
        {
          test: /\.(png|jpeg|gif|webp|jpg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[ext]", // Сохраняйте файлы в подпапке images
              },
            },
          ],
        },

        // С сохранением структуры папок (сохраниться папка src/assets/img/<имя файла>.<расширение>)
        // {
        //     test: /\.(png|jpe?g|gif)$/i,
        //     loader: 'file-loader',
        //     options: {
        //         name: '[path][name].[ext]',
        //     },
        // },

        // {
        //   test: /\.(png|jpe?g|gif)$/i,
        //   type: 'asset/resource',
        // },

        // Webpack подставит картинки в css, если там будет импорт, но не будет копировать их в папку dist, если картинка меньше 8192 байт
        // {
        //   test: /\.(png|jpg|gif)$/i,
        //   use: [
        //     {
        //       loader: 'url-loader',
        //       options: {
        //         limit: 8192,
        //       },
        //     },
        //   ],
        // },

        // Файлы шрифтов
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]", // Сохраняйте файлы с оригинальными именами
                outputPath: "images", // Укажите только папку, в которую сохранять файлы
              },
            },
          ],
        },
        // {
        //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
        //   type: 'asset/resource',
        // },
      ],
    },

    // Подключение плагинов
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        filename: "index.html",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/modules.html"),
        filename: "modules.html",
      }),
      new CleanWebpackPlugin(),
      // применять изменения только при горячей перезагрузке
      new webpack.HotModuleReplacementPlugin(),
      new CopyPlugin({
        patterns: [
          { from: "./src/assets", to: "assets" },
          { from: "./src/assets", to: "assets" },
        ],
      }),
    ],
  };

  if (isProduction) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].css",
      })
    );
  }

  return config;
};
