import Vue from 'vue'
import VueRouter from 'vue-router'
import state from "../store"

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
            meta:{requiresAuth: true},
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
                    path: '/menu/:id',
                    component:()=>import('../components/pages/menu/Edit.vue')
                },
                // 角色管理
                {
                    path: '/role',
                    component:()=>import('../components/pages/role/Index.vue')
                },
                {
                    path: '/role/add',
                    component:()=>import('../components/pages/role/Edit.vue')
                },
                {
                    path: '/role/:id',
                    component:()=>import('../components/pages/role/Edit.vue')
                },
                // 管理员管理
                {
                    path: '/user',
                    component:()=>import('../components/pages/admin/Index.vue')
                },
                {
                    path: '/user/add',
                    component:()=>import('../components/pages/admin/Edit.vue')
                },
                {
                    path: '/user/:id',
                    component:()=>import('../components/pages/admin/Edit.vue')
                },
                 // 分类管理
                 {
                    path: '/cate',
                    component:()=>import('../components/pages/Cate/Index.vue')
                },
                {
                    path: '/cate/add',
                    component:()=>import('../components/pages/Cate/Edit.vue')
                },
                {
                    path: '/cate/:id',
                    component:()=>import('../components/pages/Cate/Edit.vue')
                },
            ]
        },
        {
            path: '/login',
            component:() => import('../components/pages/Login.vue'),
        },
        
    ]
})
//全局前置路由守卫，验证是否登入
router.beforeEach((to,from,next) => {
    //判断目标路由是否需要登入,才能访问
    if(to.matched.some(recored => recored.meta.requiresAuth)){
        //如果需要登入进一步判断用户是否已经登入
        if(state.state.userinfo.token){
            next()
        }else{
            next({
                path:'/login',
                query:{redirect: to.fullPath}
            })
        }
    }else{
        next()
    }
})

export default router