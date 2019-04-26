export default {
	movieWidgetsLength: state => {
		let total = state.movie.widget_infos.length
		if (total) total -= 1
		return total
	},
	movieSubjectsLength: state => {
		return state.movie.subjects_length
	}
}