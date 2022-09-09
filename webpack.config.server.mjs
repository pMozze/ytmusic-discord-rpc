import path from 'path';

export default {
	devtool: 'source-map',
	entry: './src/server/index.ts',
	target: 'node',
	output: {
		path: path.resolve('dist/server'),
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