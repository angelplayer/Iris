import Vue from 'vue';
import Vuex from 'vuex';
import { appState, getters, actions, mutations } from "@/store/app-state";

Vue.use(Vuex);

export default new Vuex.Store({
  state: appState,
  getters: getters,
  mutations: mutations,
  actions: actions
});
