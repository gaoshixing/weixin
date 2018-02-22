import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "*",
			redirect: "/"
		},
		{
			path: 'notice',
			name: 'notice',
			redirect: {'name': 'approve'},
		},
		{
			path: '/',
			name: 'approve',
			component: (resolve) => {
				require(['../components/approve'], resolve)
			  }
		},
		{
			path: '/approve1',
			name: 'approve1',
			component: (resolve) => {
				require(['../components/approve1'], resolve)
			  }
		},
		{
			path: 'news',
			name: 'news',
			component: (resolve) => {
				require(['../components/news'], resolve)
			  }
		},
		{
			path: 'newsDetail',
			name: 'newsDetail',
			component: (resolve) => {
				require(['../components/newsDetail'], resolve)
			  }
		},
		{
			path: '/signDetail',
			name: 'signDetail',
			component: (resolve) => {
				require(['../components/signDetail'], resolve)
			  }
		},
		{
			path: '/signResult',
			name: 'signResult',
			component: (resolve) => {
				require(['../components/signResult'], resolve)
			  }
		},
		
	]
})
