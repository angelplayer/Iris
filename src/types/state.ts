import { IUser, IGenre } from '@/services/hyouka-api'
import { IMovie } from '@/services/hyouka-api'

export interface AppState {
    user?: IUser,
    error: boolean,
    genres: Array<IGenre>
}

export interface MoviesState {
    items: Array<IMovie>,
    movie?: IMovie
}