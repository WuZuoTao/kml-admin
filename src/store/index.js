import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        menuList: [],
        userinfo:{}
    },

    mutations: {
        saveMenuList(state, menuList) {
            state.menuList = menuList
        },
        //保存用户信息
        saveUserinfo(state,info){
            state.userinfo = info
        }
    },

    actions: {
        //获得菜单数据
        getMenuList({ commit }, params = {}) {
            return new Promise((resolve,reject) => {
                axios.get("/api/menulist", { params: params })
                .then((result) => {
                    commit('saveMenuList', result.data.list)
                    resolve(result)
                }).catch(err => reject(err));
            })
        },
        //用户登录
        userLogin({commit},params = {}){
            return new Promise((resolve,reject) => {
                axios.post("/api/userlogin",params)
                .then(res => {
                    commit('saveUserinfo',res.data.list)
                    resolve(res)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        }
    }
})