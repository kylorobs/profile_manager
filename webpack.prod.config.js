const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: __dirname,
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },
    plugins: [
      new MiniCssExtractPlugin()
    ]
};
