import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/index'
import auth from './auth/index'
import user from './user/index'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        home,
        auth,
        user,
    },
    plugins: [createPersistedState({paths: ['auth']})]
})

export default store