const path = require('path');
const fs = require('fs');

// Get all .js files in the src/assets/scripts directory
const jsFiles = fs.readdirSync(path.resolve(__dirname, 'src/assets/scripts')).filter(file => file.endsWith('.js'));

// Create an object where the keys are the file names without the extension and the values are the paths to the files
const entryPoints = jsFiles.reduce((entries, file) => {
	const fileNameWithoutExt = path.parse(file).name;
	entries[fileNameWithoutExt] = path.resolve(__dirname, 'src/assets/scripts', file);
	return entries;
}, {});


module.exports = {
	mode: process.env.ELEVENTY_ENV === 'development' ? 'development' : 'production',
	entry: entryPoints,
	output: {
		path: path.resolve(__dirname, 'dist/assets/scripts'), // the output directory
		filename: '[name].js', // the output file name
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
				  // `.swcrc` can be used to configure swc
				  loader: "swc-loader"
				}
			  }
		]
	},
	devtool: process.env.ELEVENTY_ENV === 'development' ? 'source-map' : false,
	resolve: {
		extensions: [".js"],
		modules: ['node_modules']
	},
};
