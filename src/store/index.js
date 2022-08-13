import Vue from 'vue'
import Vuex from 'vuex'
import  home from  './home/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // Khai báo global state
    },
    mutations: {
        // Khai báo mutations
    },
    modules: {
        home
    }

})

export default store