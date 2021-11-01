import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path: '/login',
            component:() => import('../components/pages/Login.vue')
        },
        {
            path: '/',
            component:() => import('../components/pages/Layout.vue')
        }
    ]
})

export default router