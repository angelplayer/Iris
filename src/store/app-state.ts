import { AppState } from '@/types/state'
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import { User, UserService, Command2, LoginData } from '@/services/hyouka-api';

export const appState: AppState = {
  user: {},
  error: true
}

export const getters: GetterTree<AppState, any> = {
  hasError: state => state.error,
  username: state => state.user.username
}

export const mutations: MutationTree<AppState> = {
  storeUser(state, payload: User) {
    state.error = false;
    state.user = payload;
  }
}

export const actions: ActionTree<AppState, any> = {
  login(store: ActionContext<AppState, any>, data: LoginData): any {
    alert('girl');
    new UserService().login(data).then((envelope) => {

      store.commit('storeUser', envelope.user);

    });
  }
}

