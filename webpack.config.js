const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    // entry: "./src/index.js",
    // output: { filename: "bundle.js" },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};
