import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue'
import Auth from "./views/Auth.vue";
import GenreView from '@/views/GenreView.vue'
import MainView from '@/views/MainView.vue'
import Creator from '@/views/Creator.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: Auth
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'main-view',
          component: MainView
        },
        {
          path: 'genre',
          name: 'genre',
          component: GenreView
        },
        {
          path: 'create/:id?',
          name: 'create',
          component: Creator
        }
      ]
    }
  ],
});
