import { AuthState } from '@/types/state';
import { GetterTree, MutationTree, ActionTree, Module, ActionContext } from 'vuex';
import JwtService from '@/services/jwt.service';
import { LOGIN, LOADING, SET_AUTH, PURGE_AUTH, LOGOUT } from './constant';
import { UserService, Command2, IUser } from '@/services/hyouka-api';



export const state: AuthState = {
    isAuthenticated: !!JwtService.getToken(),
    user: null
}

export const getters: GetterTree<AuthState, any> = {
    authenticated: (state) => state.isAuthenticated,
    logined: (state) => state.isAuthenticated && state.user != null,
    account: (state) => state.user.username.toUpperCase()
}

export const mutations: MutationTree<AuthState> = {
    [SET_AUTH](state: AuthState, payload: IUser) {
        state.isAuthenticated = true;
        state.user = payload;
        JwtService.setToken(payload.token);
    },

    [PURGE_AUTH](state: AuthState) {
        state.isAuthenticated = false;
        state.user = null;
        JwtService.destroyToken();
    }
}

export const actions: ActionTree<AuthState, any> = {
    [LOGIN](context: ActionContext<AuthState, any>, data: Command2) {
        context.commit(LOADING, true);
        return new Promise((resolve, reject) => {
            new UserService().login(data).then((envelop) => {
                context.commit(SET_AUTH, envelop.user);
                resolve(envelop.user);
            }).catch(e => {
                // context.commit(SET_ERROR, e, { root: true });
                reject(e);
            }).finally(() => context.commit(LOADING, false))
        });
    },

    [LOGOUT](context: ActionContext<AuthState, any>) {
        return new Promise((resolve) => {
            context.commit(LOADING, true, { root: true });
            context.commit(PURGE_AUTH);
            context.commit(LOADING, false, { root: true })
            resolve();
        })
    }
}

export const auth: Module<AuthState, any> = {
    state: state, mutations: mutations, actions: actions, getters: getters
}