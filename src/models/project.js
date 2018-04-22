import { getProjects } from '@services/project'

export default {
  namespace: 'project',

  state: {
    projects: [],
    page: 1,
    total: 1
  },

  effects: {
    *get(action, { put, call }) {
      const data = yield call(getProjects)
      yield put({type: 'set', payload: { result: data.data.result }})
    }
  },

  reducers: {
    set(state, { payload: { result } }) {
      return {
        ...state,
        projects: result.data,
        page: result.page,
        total: result.total
      }
    }
  }


}