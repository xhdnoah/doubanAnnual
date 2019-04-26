var path = require('path')
var port = 8000

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: './',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtension: ['js', 'css']
	},
	dev: {
		env: require('./dev.env'),
		port,
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/movie_annual2018': {
				target: 'https://movie.douban.com/ithil_j/activity',
				changeOrigin: true,
			}
			// '/game_annual2018': `https://movie.douban.com/ithil_j/activity/`,
			// '/book_annual2018': `https://movie.douban.com/ithil_j/activity/`,
			// '/drama_annual2018': `https://movie.douban.com/ithil_j/activity/`,
			// '/music_annual2018': `https://movie.douban.com/ithil_j/activity/`
		},
		cssSourceMap: false
	}
}