const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/main.ts",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "public"),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["ts-loader", "eslint-loader"],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	devServer: {
		contentBase: path.resolve(__dirname, "public"),
		compress: true,
		port: 1234,
		open: true,
		hotOnly: false
	}
};
