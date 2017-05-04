const ROOT_DIR = __dirname;
const SRC_DIR = ROOT_DIR + "/src";
const DIST_DIR = ROOT_DIR + "/dist";

module.exports = {
    entry: (SRC_DIR + "/Application.tsx"),
    output: {
        filename: "bundle.js",
        path: ROOT_DIR
    },

    devtool: "source-map",

    devServer: {
        contentBase: ROOT_DIR
    },

    resolve: {
        extensions: [
            ".js",
            ".ts",
            ".tsx",
            ".json"
        ]
    },

    module: {
        rules: [
            {
                // Arquivos ".ts" ou ".tsx" serão processados pelo "awesome-typescript-loader"
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                // Arquivos ".js" terão um arquivo ".map" gerado pelo "source-map-loader"
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};
