import { MoviesState } from '@/types/state';
import { Movie, Command6, Command4, MoviesService, Command5, MovieData, MovieEnvelope } from '@/services/hyouka-api';
import { MutationTree, ActionTree, GetterTree, ActionContext, Module } from 'vuex';
import { FETCH_MOVIES, CREATE_MOVIE } from '@/store/constant';

export const state: MoviesState = {
    items: [], movie: new Movie()
}

export const getters: GetterTree<MoviesState, any> = {
    count: state => state.items.length,
    movie: state => state.movie,
    movieItems: state => state.items
}

export const mutations: MutationTree<MoviesState> = {
    storeMovies(state, payload): void {
        state.items = payload;
    }
}

export const actions: ActionTree<MoviesState, any> = {
    [FETCH_MOVIES](store: ActionContext<MoviesState, any>, data: Command4): void {
        new MoviesService().get().then((envelope) => {
            store.commit('storeMovies', envelope.movies);
        })
    },

    [CREATE_MOVIE](store: ActionContext<MoviesState, any>, data: MovieData): Promise<MovieEnvelope> {

        return new MoviesService().create(new Command4({ movie: data }));
    }
}


export const movies: Module<MoviesState, any> = {
    getters: getters, actions: actions, mutations: mutations, state: state
}