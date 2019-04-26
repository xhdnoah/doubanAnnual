import Axios from 'axios'
import {
	getMovieAnnual,
	getMovieWidgetInfos
} from './mutations-types'

const Fetch = Axios.create({
	baseURL: '/',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json'
	}
})

export default {
	[getMovieAnnual]({
		commit
	}) {
		return new Promise(function (resolve, reject) {
			(async () => {
				let res = await Fetch.get('movie_annual2018')
				let {
					pv,
					payload,
					widget_infos
				} = res.data.res
				commit('set-movie-annual', {
					pv,
					payload,
					widget_infos
				})
				resolve()
			})()
		})
	},
	[getMovieWidgetInfos]({
		commit
	}, {
		nth
	}) {
		return new Promise(function (resolve, reject) {
			(async () => {
				let res = await Fetch.get(`movie_annual2018/widget/${nth}`)
				if (typeof res.data.res != 'undefined') {
					let {
						id,
						kind_str,
						payload,
						subject,
						subjects,
						people,
						user
					} = res.data.res
					commit('set-movie-widget-infos', {
						nth,
						subject: {
							id,
							kind_str,
							payload,
							subject,
							subjects,
							people,
							user
						}
					})
				} else {
					commit('set-movie-widget-infos', {
						nth,
						subjects: {
							id: `errors${nth}`,
							kind_str: 'error'
						}
					})
				}
				resolve()
			})()
		})
	}
}