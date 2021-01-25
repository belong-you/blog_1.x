const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
	configureWebpack: config => {
		config.plugins.push(new CompressionPlugin({
			filename: '[path].gz[query]',
			//压缩算法
			algorithm: 'gzip',
			//匹配文件
			test: /\.js$|\.css$|\.html$|\.woff$|\.ttf$|\.eot$|/,
			//压缩超过此大小的文件,以字节为单位
			threshold: 1024,
			minRatio: 0.8,
			//删除原始文件只保留压缩后的文件
			deleteOriginalAssets: false
		}))
		// 生产环境删除console
		config.optimization.minimizer[0].options.terserOptions.compress = { drop_console: true, drop_debugger: false, pure_funcs: ['console.log'] } // 移除console
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
}