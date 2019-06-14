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
      path: '/',
      component: resolve => require(['@/pages/index'], resolve),
      children: [
        {
          path: '/',
          name: 'home',
          component: resolve => require(['@/pages/home/index'], resolve),
          meta: {
            title:'首页'
          }
        },
        {
          path: 'judicial',
          name: 'judicial',
          component: resolve => require(['@/pages/sfba/index'], resolve),
          meta: {
            title:'司法办案'
          },
          children:[
            {
              path: 'criminal',
              name: 'criminal',
              component: resolve => require(['@/pages/sfba/criminal'], resolve),
              meta: {
                title:'司法办案-刑事'
              }
            },
            {
              path: 'civil',
              name: 'civil',
              component: resolve => require(['@/pages/sfba/civil'], resolve),
              meta: {
                title:'司法办案-民事'
              }
            },
            {
              path: 'administrative',
              name: 'administrative',
              component: resolve => require(['@/pages/sfba/administrative'], resolve),
              meta: {
                title:'司法办案-行政'
              }
            },
            {
              path: 'lawsuit',
              name: 'lawsuit',
              component: resolve => require(['@/pages/sfba/lawsuit'], resolve),
              meta: {
                title:'司法办案-公益诉讼'
              }
            },
            {
              path: 'control',
              name: 'control',
              component: resolve => require(['@/pages/sfba/control'], resolve),
              meta: {
                title:'司法办案-控申'
              }
            },
          ]
        },
		  {
			  path: 'teamManagement',
			  name: 'teamManagement',
			  component: resolve => require(['@/pages/team-management/index'], resolve),
			  meta: {
				  title:'队伍管理'
			  }
		  },
		  {
			  path: 'checkOffice',
			  name: 'checkOffice',
			  component: resolve => require(['@/pages/check-office/index'], resolve),
			  meta: {
				  title:'检查办公'
			  }
		  },
      ]
    }
  ]
})
