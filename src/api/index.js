import axios from 'axios'
import store from "../store";
import router from "../router";

const baseUrl = process.env.VUE_APP_BASE_URL;

export const apiAxios = axios.create({
    baseURL:`${baseUrl}/api`,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
})

apiAxios.interceptors.request.use(config => {
    let token = store.state.auth.accessToken
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

apiAxios.interceptors.response.use(undefined, (error) => {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
            store.commit('auth/updateLoginStatus', false)
            store.commit('auth/updateAuthUser', {})
            store.commit('auth/updateAccessToken', '')
            return router.push({name: 'Login'})
        }
    }
    return Promise.reject(error);
})

export default {
    getAuthUser () {
        return apiAxios({
            method: 'get',
            url: '/auth/me'
        })
    },
    login (data) {
        return apiAxios({
            method: 'post',
            url: 'auth/login',
            data: data
        })
    },
    register (params) {
        return  apiAxios({
            method: 'post',
            url: 'auth/register',
            params:params
        })
    },

    getDirectory() {
        return  apiAxios({
            method: 'get',
            url: '/directories',
        })
    },
    createDirectory(data) {
        return  apiAxios({
            method: 'post',
            url: 'directories',
            data:data
        })
    },
    update(id,data) {
        return apiAxios({
            method: 'put',
            url: 'directories/' + id,
            data:data
        })
    },
    createList(data) {
        return  apiAxios({
            method: 'post',
            url: 'cards',
            data:data
        })
    },
    updateUser(data) {
        return apiAxios({
            method: "post",
            url: "/users",
            data:data
        })
    },
    deleteDirectory(id) {
        return  apiAxios({
            method: 'delete',
            url: 'directories/' + id,
        })
    },

    changeCard(data) {
        return  apiAxios({
            method: "put",
            url: `/cards/${data.card_id}/index`,
            data:data
        })
    },
    changeDirectory(data) {
        return  apiAxios({
            method: "put",
            url: `/cards/${data.card_id}/directory`,
            data:data
        })
    },
    updateCard(id) {
        return  apiAxios({
            method: "put",
            url: `/cards/` +id,
        })
    },
    updateTileCard(data,id) {
        return apiAxios({
            method: "put",
            url: `/cards/` +id,
            data:data
        })
    },
    deleteCard(id) {
        return apiAxios({
            method: "delete",
            url: `/cards/` +id,
        })
    },
    updateStatus(data) {
        return apiAxios({
            method: "put",
            url: `/cards/${data.card_id}/change-status`,
            data:data
        })
    },
    addLabel(data) {
        return apiAxios({
            method: "post",
            url: `/cards/${data.card_id}/label`,
            data:data
        })
    },
    getLabel() {
        return apiAxios({
            method: "get",
            url: "/labels",
        })
    },
    destroyLabelInCard(data) {
        return apiAxios({
            method: "delete",
            url: `/cards/${data.card_id}/detach-labels`,
            data:data
        })
    },
    addLabelInCard(data) {
        return apiAxios({
            method: "post",
            url: `/cards/${data.card_id}/attach-labels`,
            data:data
        })
    },
    addWork(data) {
        return apiAxios({
            method: "post",
            url: "/check-lists",
            data:data
        })
    },
    addFile(data) {
        return apiAxios({
            method: "post",
            url: `/cards/${data.get('card_id')}/upload-file`,
            data:data
        });
    },
    detailCard(id) {
        return apiAxios({
            method: "get",
            url: `/cards/${id}`,
        })
    },
    updateDeadline(data) {
        return apiAxios({
            method: "put",
            url: `/cards/${data.card_id}/change-status-deadline`,
            data:data
        })
    },
    updatePassword(data) {
        return apiAxios({
            method: "put",
            url: "/users/password",
            data:data
        })
    },
    destroyWork(id) {
        return apiAxios({
            method: "delete",
            url: `/check-lists/${id}`,
        })
    },
    destroyWorkChildren(id) {
        return apiAxios({
            method: "delete",
            url: `/check-list-childs/${id}`,
        })
    },
    addWorkChildren(data) {
        return apiAxios({
            method: "post",
            url: "/check-list-childs",
            data:data
        })
    },
    updateWorkChildren(data) {
        return apiAxios({
            method: "put",
            url: `/check-list-childs/${data.check_list_child_id}`,
            data:data
        })
    },
    updateWork(data) {
        return apiAxios({
            method: "put",
            url: `/check-lists/${data.check_list_id}`,
            data:data
        })
    },
    updateStatusWorkChildren(data) {
        return apiAxios({
            method: "put",
            url: `/check-list-childs/${data.id}/change-status`,
            data:data
        })
    },
}