import Vue    from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path    : "*",
			redirect: "/"
		},
		{
			path     : '/',
			component: resolve => require(['@/pages/index'], resolve),
			children : [
				{
					path     : '/',
					name     : 'home',
					component: resolve => require(['@/pages/home/index'], resolve),
					meta     : {
						title: '首页'
					}
				},
				{
					path     : 'judicial',
					name     : 'judicial',
					component: resolve => require(['@/pages/judicial-case/index'], resolve),
					meta     : {
						title: '司法办案'
					},
					redirect : { name: 'criminal' },
					children : [
						{
							path     : 'criminal',
							name     : 'criminal',
							component: resolve => require(['@/pages/judicial-case/criminal/index'], resolve),
							meta     : {
								title: '司法办案-刑事'
							}
						},
						{
							path     : 'civil',
							name     : 'civil',
							component: resolve => require(['@/pages/judicial-case/civil/index'], resolve),
							meta     : {
								title: '司法办案-民事'
							}
						},
						{
							path     : 'administrative',
							name     : 'administrative',
							component: resolve => require(['@/pages/judicial-case/administrative/index'], resolve),
							meta     : {
								title: '司法办案-行政'
							}
						},
						{
							path     : 'lawsuit',
							name     : 'lawsuit',
							component: resolve => require(['@/pages/judicial-case/public-litigation/index'], resolve),
							meta     : {
								title: '司法办案-公益诉讼'
							}
						},
						{
							path     : 'undetected',
							name     : 'undetected',
							component: resolve => require(['@/pages/judicial-case/undetected/index'], resolve),
							meta     : {
								title: '司法办案-未检'
							}
						},
						{
							path     : 'prosecution',
							name     : 'prosecution',
							component: resolve => require(['@/pages/judicial-case/prosecution/index'], resolve),
							meta     : {
								title: '司法办案-控申'
							}
						},
						{
							path     : 'checkCharter',
							name     : 'checkCharter',
							component: resolve => require(['@/pages/judicial-case/procuratorial'], resolve),
							meta     : {
								title: '司法办案-检委办/检察技术'
							}
						}
					]
				},
				{
					path     : 'teamManagement',
					name     : 'teamManagement',
					component: resolve => require(['@/pages/team-management/index'], resolve),
					meta     : {
						title: '队伍管理'
					}
				},
				{
					path     : 'checkOffice',
					name     : 'checkOffice',
					component: resolve => require(['@/pages/check-office/index'], resolve),
					meta     : {
						title: '检查办公'
					}
				},
				{
					path     : 'inspectionGuarantee',
					name     : 'inspectionGuarantee',
					component: resolve => require(['@/pages/inspection-guarantee/index'], resolve),
					meta     : {
						title: '检务保障'
					}
				}
			]
		}
	]
})
