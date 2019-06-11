import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import tags from './modules/tags'
import logs from './modules/logs'
import role from './modules/role'

import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user,
        common,
        logs,
        tags,
        role
    },
    getters,
})

export default store
