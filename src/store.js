import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            first_name: "",
            last_name: "",
            email: "",
            token: ""
        },
        loading: false
    },
    plugins: [createPersistedState()],
    mutations: {
        user(state, data) {
            state.user = data
        },
        emptyUser(state) {
            state.user = {
                first_name: "",
                last_name: "",
                email: "",
                token: ""
            }
        },
        loading(state, data) {
            state.loading = data;
        }
    },
    actions: {
        setUser({ commit }, data) {
            commit("user", data)
        },
        setEmptyUser({ commit }) {
            commit("emptyUser")
        },
        setLoading({ commit }, data) {
            commit("loading", data);
        }
    },
    getters: {
        user: state => state.user,
        loading: state => state.loading
    }
})

