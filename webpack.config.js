module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: "./dist",
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer: {
        inline: true,
        contentBase: "./dist"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_module|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread"]
                }
            }
        ]
    }
}