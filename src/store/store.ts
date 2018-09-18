import Vue from 'vue';
import Vuex from 'vuex';
import { app } from "@/store/app-state";
import { movies } from '@/store/movie-state'
import { episode } from '@/store/episode-state'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app, movies, episode
  }
});
