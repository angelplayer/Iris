import { EpisodeState } from '@/types/state';
import { MutationTree, ActionContext, ActionTree, GetterTree, Module } from 'vuex';
import { FETCH_EPISODES, CREATE_EPISODE } from '@/store/constant';
import { EpisodesService, Command, EpisodeEnvelope, EpisodesEvelope, IEpisode, Episode } from '@/services/hyouka-api';

export const state: EpisodeState = {
    episodes: []
}

export const mutations: MutationTree<EpisodeState> = {

    storeEpisode(state: EpisodeState, payload: Array<IEpisode>): void {
        state.episodes.concat(payload);
    },
    addEpisode(state: EpisodeState, payload: IEpisode): void {
        state.episodes.push(payload);
    }

}

export const actions: ActionTree<EpisodeState, any> = {

    [CREATE_EPISODE](store: ActionContext<EpisodeState, any>, cmd: Command) {
        new EpisodesService().create(cmd.movieId, cmd).then((envelope: EpisodeEnvelope) => {
            store.commit('addEpisode', envelope.episode);
        })
    },
    [FETCH_EPISODES](store: ActionContext<EpisodeState, any>, movieId: number) {
        new EpisodesService().get(movieId).then((envelope: EpisodesEvelope) => {
            store.commit('storeEpisode', envelope.episodes);
        })
    }

}

export const getters: GetterTree<EpisodeState, any> = {
    episodes: state => state.episodes
}

export const episode: Module<EpisodeState, any> = {
    state: state, actions: actions, mutations: mutations, getters: getters
}