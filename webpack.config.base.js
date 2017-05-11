var path = require("path");
var webpack = require("webpack");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function () {
    const isDev = process.env.NODE_ENV === 'development';

    let config = {
        entry: [
            "react-hot-loader/patch",
            "webpack-dev-server/client?http://localhost:3000",
            "webpack/hot/only-dev-server",
            "./src/index.tsx"
        ],
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "/",
            filename: "app.[hash].js"
        },
        devtool: "eval-source-map",
        target: 'web',

        resolve: {
            extensions: ['.js', '.ts', '.tsx']
        },

        module: {
            rules: [
                {
                    test: /\.scss|css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                        { loader: 'resolve-url-loader' },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                    ]
                },

                {
                    test: /\.(svg|png|jpe?g|gif)$/i,
                    use: [
                        'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
                        {
                            loader: 'image-webpack-loader',
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                optipng: {
                                    optimizationLevel: 4,
                                },
                                pngquant: {
                                    quality: '75-90',
                                    speed: 3,
                                },
                            },
                        }
                    ]
                },

                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/font-woff'
                            }
                        }
                    ]
                },

                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: "file-loader"
                },

                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                'Promise': 'bluebird'
            }),

            new webpack.DefinePlugin({
                DEV: isDev
            }),

            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),

            new HtmlWebpackPlugin({ hash: false, template: "./index.hbs" }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
            new webpack.LoaderOptionsPlugin({
                test: /\.scss$/,
                debug: true,
                options: {
                    postcss: function () {
                        return [precss, autoprefixer];
                    },
                    context: path.join(__dirname, "src"),
                    output: { path: path.join(__dirname, "dist") }
                }
            })
        ]
    };

    if (isDev) {
        config.devServer = {
            publicPath: "/",
            hot: true,
            port: 3000,
            host: 'localhost',
            historyApiFallback: true,
            contentBase: './'
        };
    }

    return config;
}