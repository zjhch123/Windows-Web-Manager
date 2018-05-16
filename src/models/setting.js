import { getUsers, getGroups } from '@services/setting'

export default {

  namespace: 'setting',
  
  state: {
    users: [],
    groups: []
  },

  effects: {
    *users(state, {put, call}) {
      const data = yield call(getUsers)
      yield put({type: 'setUsers', payload: { result: data.data.result }})
    },
    *groups(state, {put, call}) {
      const data = yield call(getGroups)
      yield put({type: 'setGroups', payload: { result: data.data.result }})
    }
  },

  reducers: {
    setUsers(state, {payload: result}) {
      return {
        ...state,
        users: result.result
      }
    },
    setGroups(state, {payload: result}) {
      return {
        ...state,
        groups: result.result
      }
    }
  }

}