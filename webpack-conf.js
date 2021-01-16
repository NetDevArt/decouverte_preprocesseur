const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Extract css in its own file
const webpack = require('webpack');

const path_modules = path.resolve(__dirname, 'node_modules');
const base_path = path.resolve(__dirname, 'static', 'node_src');
const dist_static = path.resolve(__dirname, 'static', 'webpacked_src');

module.exports = {
    entry: {
        bootstrap: {
            import: [
                base_path + '/bootstrap/bootstrap-bundle.js',
            ],
            filename: 'js_packed/[name].js',
        },
        fontawesome: {
            import: [
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot',
                //path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-brands-400.svg',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-regular-400.eot',
                //path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-regular-400.svg',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot',
                //path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff',
                path_modules + '/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
            ],
            filename: 'fonts/[name].js'
        },
    },
    output: {
        path: dist_static
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        autoprefixer = require('autoprefixer'),
        new MiniCssExtractPlugin({
            filename: "css_packed/[name].css",
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: 'css/', name: '[name].min.css'}
                    },
                    'sass-loader'
                ]
            }
        ],
    },
};