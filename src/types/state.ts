import { IUser, IGenre } from '@/services/hyouka-api'

export interface AppState {
    user?: IUser,
    error: boolean,
    genres: Array<IGenre>
}