import { MoviesState } from '@/types/state';
import { Movie, Command6, Command4, MoviesService, Command5, MovieData, MovieEnvelope, MovieData2, Unit } from '@/services/hyouka-api';
import { MutationTree, ActionTree, GetterTree, ActionContext, Module, Action } from 'vuex';
import { FETCH_MOVIES, CREATE_MOVIE, UPDATE_MOVIE, DELETE_MOVIE } from '@/store/constant';

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
    },

    [UPDATE_MOVIE](store: ActionContext<MoviesState, any>, cmd: Command5): Promise<MovieEnvelope> {
        return new MoviesService().edit(cmd.id, cmd);
    },
    [DELETE_MOVIE](store: ActionContext<MoviesState, any>, movieId: number): Promise<Unit> {
        return new MoviesService().delete(movieId).then(() => {
            return store.dispatch(FETCH_MOVIES)
        });
    }
}



export const movies: Module<MoviesState, any> = {
    getters: getters, actions: actions, mutations: mutations, state: state
}