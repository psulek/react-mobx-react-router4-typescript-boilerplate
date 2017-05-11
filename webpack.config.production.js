var path = require("path");
var webpack = require("webpack");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router'],
        app: './src/index.tsx'
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: 'assets/[name].[hash].js',
        chunkFilename: 'assets/[name].[chunkhash].js'
    },
    devtool: 'cheap-module-source-map',
    target: 'web',

    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },

    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    allChunks: true,
                    //use: ['css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader']
                    use: [
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
                })
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
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            DEV: false
            /*'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }*/
        }),

        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            debug: true,
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                },
                context: path.join(__dirname, 'src'),
                output: {
                    path: path.join(__dirname, 'dist')
                }
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        new ExtractTextPlugin("assets/styles.css"),

        /*new ExtractTextPlugin({
            filename: 'assets/[name].[contenthash].css',
            allChunks: true
        }),*/
        new HtmlWebpackPlugin({ hash: false, template: "./index.hbs" })
    ]
};