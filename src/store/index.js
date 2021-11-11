import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        menuList: []
    },

    mutations: {
        saveMenuList(state, menuList) {
            state.menuList = menuList
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
        }
    }
})