import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Account from './views/Account.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/account',
            name: 'account',
            component: Account
        },
    ]
})
