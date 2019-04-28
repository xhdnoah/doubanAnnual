import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
	movie: {
		pv: 0,
		payload: {},
		widget_infos: [],
		// widgets
		subjects: [],
		subjects_length: 0
	},
	Y: 0,
	resolve: true,
	isPhone: document.body.clientWidth <= 414 ? true : false,
	Error: false
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	plugins: [
		createPersistedState({
			storage: window.sessionStorage
		})
	]
})