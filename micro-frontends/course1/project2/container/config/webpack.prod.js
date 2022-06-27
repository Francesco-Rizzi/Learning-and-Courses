const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const commongConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
	mode: "production",
	output: {
		publicPath: "/container/latest/",
		filename: "[name].[contenthash].js",
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			remotes: {
				marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
			},
			shared: packageJson.dependencies,
		}),
	],
};

module.exports = merge(commongConfig, prodConfig);
