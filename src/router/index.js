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
          ]
        }
      ]
    }
  ]
})
