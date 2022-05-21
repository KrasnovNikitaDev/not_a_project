const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'spa.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 9001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ "style-loader", "css-loader", "sass-loader", ]
            },
        ]
    }
}