import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import vClickOutside from 'v-click-outside';

Vue.use(vClickOutside)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	const {
		params
	} = to
	if (!parseInt(params.nth) && parseInt(params.nth) !== 0)
		next({
			path: `/${params.kind}/annual2018/0`,
			query: null
		})
	else {
		store.commit('set-y', {
			y: -100 * parseInt(params.nth)
		})
		// 优化切页速度，可以一次获取前后几项的数据
		function fn() {
			store.dispatch(`get-${params.kind}-widget-infos`, {
				nth: parseInt(params.nth)
			}).then(() => {
				next()
			})
		}
		if (!store.getters[`${params.kind}WidgetsLength`]) {
			store.dispatch(`get-${params.kind}-annual`).then(() => {
				fn()
			})
		} else {
			fn()
		}
	}
	return true
})

export default new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})