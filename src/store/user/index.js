export default {
    namespaced: true,
    state: {
        users: [],
        transactions:[],
        rechargeBySeller:[],
        orderBySeller:[],
        trashedSellers: [],
    },
    getters: {
        //
    },
    mutations: {
        updateUser(state, users) {
            state.users = users
        },
        updateTransactions(state,transactions){
            state.transactions = transactions
        },
        updateRechargeBySeller(state, recharge){
            state.rechargeBySeller = recharge
        },
        updateOrderBySeller(state, transaction){
            state.orderBySeller = transaction
        },
        updateTrashedSellers(state, trashedSellers) {
            state.trashedSellers = trashedSellers
        },
    },
}