import {
	setMovieAnnual,
	setMovieWidgetInfos,
	setY,
	changeStatus,
	changeView,
	error
} from './mutations-types'

export default {
	[setMovieAnnual](state, {
		pv,
		payload,
		widget_infos
	}) {
		state.movie.pv = pv
		state.movie.payload = payload
		state.movie.widget_infos = widget_infos
	},
	[setMovieWidgetInfos](state, {
		nth,
		subject
	}) {
		// subject：widget 页上的主项目
		state.movie.subjects[nth] = subject
		state.movie.subjects_length = state.movie.subjects.length
	},
	[setY](state, {
		y
	}) {
		state.Y = y
	},
	// Scroll status
	[changeStatus](state, {
		status
	}) {
		state.resolve = status
	},
	[changeView](state, {
		status
	}) {
		state.isPhone = status
	},
	[error](state, {
		status
	}) {
		state.Error = status
	}
}