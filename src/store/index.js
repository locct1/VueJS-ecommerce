import { createApp } from 'vue'
import { createStore } from 'vuex'
import state from "./state";
import * as getters from './getters';
import * as mutations from "./mutations";
import * as actions from "./actions";
import createPersistedState from 'vuex-persistedstate'

// Create a new store instance.
const store = createStore({
    state,
    getters,
    mutations,
    actions,
    plugins: [createPersistedState()]

})
export default store