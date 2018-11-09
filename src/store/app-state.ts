import { AppState } from '@/types/state'
import { ActionTree, MutationTree, GetterTree, ActionContext, Module } from 'vuex'
import { User, UserService, Command2, ILoginData, Command3, Genre, Command6, GenresEnvelope, GenresService, } from '@/services/hyouka-api';
import { LOGIN, REGISTER, FETCH_GENRES, ADD_GENRE } from '@/store/constant'
import JwtService from '@/services/jwt.service';


export const state: AppState = {
  error: false,
  genres: [],
  isLoading: false
}

export const getters: GetterTree<AppState, any> = {
  hasError: state => state.error,
  genres: state => state.genres,
  loading: state => state.isLoading
}

export const mutations: MutationTree<AppState> = {
  loading(state, payload: boolean) {
    state.isLoading = payload;
  },
  storeGenre(state, payload: Array<Genre>) {
    state.genres = payload;
  }
}

export const actions: ActionTree<AppState, any> = {
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


