import api from '../../api'
export default {
    namespaced: true,
    state: {
        // Khai báo state
        list: [],
    },
    getters: {
        // Khai báo getters
    },
    mutations: {
        // Khai báo mutations
        getList(state) {
            api.getDirectory().then((res) => {
                state.list = res.data.data;
            }).catch(() => {})

        },
    },
}