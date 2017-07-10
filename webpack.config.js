var path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.ts?$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                configFile: 'tslint.json',
                typeCheck: true
            }
        },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader']
            }
        ],
    }
}