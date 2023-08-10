const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "..", "website/static"),  //output static folder of build to django folder
        filename: "bundle.js",
        assetModuleFilename: "images/[name][ext]", // bundle images into folder
        clean: true  // clean dist directory on each build
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html" // inject bundled js files into index.html
        }),
    ],

    devServer: {
        port: 4000,
        historyApiFallback: true
    },

    module: {
        rules: [
            // babel loader for backward compatibility of javascript on older browsers
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            // loader for css and scss files
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // loader for assets (images, icons etc)
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset/resource"
            }
        ]
    },

    optimization: {
        minimize: true,
    },

    resolve: {
        // resolve these extensions, we can omit them in the names of files
        extensions: [".js", ".png", ".css"],
        alias: {
            "@images": path.resolve(__dirname, "./src/static/images"),
            "@styles": path.resolve(__dirname, "./src/static/css"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@": path.resolve(__dirname, "./src")
        }
    }
}