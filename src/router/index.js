import Vue from 'vue'
import Router from 'vue-router'
import mainContainer from '@/components/main'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		redirect: '/movie/annual2018/0'
	}, {
		path: '/:kind',
		component: mainContainer,
		children: [{
			path: 'annual2018/:nth'
		}]
	}],
	mode: 'history'
})