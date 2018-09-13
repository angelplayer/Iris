import { IUser } from '@/services/hyouka-api'

export interface AppState {
    user?: IUser,
    error: boolean
}