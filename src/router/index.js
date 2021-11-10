import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//解决vue-router的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err => err)
}
const router = new VueRouter({
    routes:[
        {
            path: '/',
            component:() => import('../components/pages/Layout.vue'),
            redirect:'/home',
            children:[
                {
                    path: '/home',
                    component:()=>import('../components/pages/home/Index.vue')
                },
                {
                    path: '/menu',
                    component:()=>import('../components/pages/menu/Index.vue')
                },
                {
                    path: '/menu/add',
                    component:()=>import('../components/pages/menu/Edit.vue')
                },
                {
                    path: '/role',
                    component:()=>import('../components/pages/role/Index.vue')
                },
                {
                    path: '/admin',
                    component:()=>import('../components/pages/admin/Index.vue')
                },
            ]
        },
        {
            path: '/login',
            component:() => import('../components/pages/Login.vue'),
        },
        
    ]
})

export default router