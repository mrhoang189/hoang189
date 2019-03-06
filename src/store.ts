import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: [
            {name: 'admin', password: 'admin'},
            {name: 'admin1', password: 'admin1'},
            {name: 'admin2', password: 'admin2'},
            {name: 'admin3', password: 'admin3'}
        ],
        accountSelected: {},
        isEditAccount: false
    },
    getters: {
        LIST_ACCOUNTS: state => {
            return state.items;
        },
        GET_ACCOUNT: state => {
            return state.accountSelected;
        },
        GET_MODE: state => {
            return state.isEditAccount
        }
    },
    mutations: {
        SET_ACCOUNT: (state, newValue) => {
            state.accountSelected = newValue
        },
        SET_MODE: (state, newValue) => {
            state.isEditAccount = newValue
        },
        ADD_ACCOUNT: (state, payload) => {
            state.items.push(payload)
        },
        UPDATE_ACCOUNT: (state, payload) => {
            // let filterAccount = state.items.filter(item => {
            //     return item.name === payload.name
            // });
            // filterAccount.name = payload.password;
            // filterAccount.password = payload.password;
        },
        DELETE_ACCOUNT: (state, payload) => {
            const accountIndex = state.items.findIndex(item => item.name === payload.name)
            state.items.splice(accountIndex, 1);
        }
    },
    actions: {
        setAccount: ({commit, state}, newValue) => {
            commit('SET_ACCOUNT', newValue);
            return state.accountSelected;
        },
        setMode: ({commit, state}, newValue) => {
            commit('SET_MODE', newValue);
            return state.isEditAccount;
        }
    }
})
