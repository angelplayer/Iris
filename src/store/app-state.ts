import { IUser } from '@/services/hyouka-api'
import { ActionTree, MutationTree, GetterTree } from 'vuex'

export interface AppState {
  user?: IUser,
  error: boolean
}

