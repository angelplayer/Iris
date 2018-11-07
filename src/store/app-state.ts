import { AppState } from '@/types/state'
import { ActionTree, MutationTree, GetterTree, ActionContext, Module } from 'vuex'
import { User, UserService, Command2, ILoginData, Command3, Genre, Command6, GenresEnvelope, GenresService, } from '@/services/hyouka-api';
import { LOGIN, REGISTER, FETCH_GENRES, ADD_GENRE } from '@/store/constant'
import JwtService from '@/services/jwt.service';


export const state: AppState = {
  user: {},
  authenticated: !!JwtService.getToken(),
  error: false,
  genres: [],
  isLoading: false
}

export const getters: GetterTree<AppState, any> = {
  hasError: state => state.error,
  username: state => state.user.username,
  genres: state => state.genres,
  loading: state => state.isLoading
}

export const mutations: MutationTree<AppState> = {
  loading(state, payload: boolean) {
    state.isLoading = payload;
  },
  storeUser(state, payload: User) {
    state.error = false;
    state.user = payload;
    JwtService.setToken(payload.token);
  },
  storeGenre(state, payload: Array<Genre>) {
    state.genres = payload;
  }
}

export const actions: ActionTree<AppState, any> = {

  [LOGIN](store: ActionContext<AppState, any>, data: Command2): any {
    JwtService.destroyToken();
    new UserService().login(data).then((envelope) => {
      store.commit('storeUser', envelope.user);
    }).catch((e) => console.log(e));
  },

  [REGISTER](store: ActionContext<AppState, any>, data: Command3): any {
    new UserService().register(data).then((envelope) => {
      store.commit('storeUser', envelope.user)
    }).catch((e) => console.log(e))
  },

  [FETCH_GENRES](store: ActionContext<AppState, any>): any {
    new GenresService().get().then((envelope) => {
      store.commit('storeGenre', envelope.genre)
    }).catch((e) => console.log(e))
  },
  [ADD_GENRE](store: ActionContext<AppState, any>, data: Command6): any {
    new GenresService().post(data).then((envelope) => {
      store.dispatch(FETCH_GENRES);
    })
  }
}



export const app: Module<AppState, any> = {
  state: state, getters: getters, actions: actions, mutations: mutations
};


