import path from 'path';

export default {
	devtool: 'source-map',
	entry: './src/client/index.ts',
	output: {
		path: path.resolve('dist/client'),
		clean: true
	},
	module: {
		rules: [
			{
				test: /.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts']
	}
};