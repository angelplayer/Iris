import { IUser, IGenre, IEpisode } from '@/services/hyouka-api'
import { IMovie } from '@/services/hyouka-api'

export interface AppState {
    user?: IUser,
    error: boolean,
    genres: Array<IGenre>,
    isLoading: boolean
}

export interface MoviesState {
    items: Array<IMovie>,
    movie?: IMovie
}

export interface EpisodeState {
    episodes: Array<IEpisode>
}