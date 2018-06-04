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
      const data = yield call(getProjects, action.condition)
      yield put({type: 'setup', payload: { result: data.data.result }})
    },
  },

  reducers: {
    setup(state, { payload: { result } }) {
      return {
        ...state,
        projects: result.list,
        page: result.page,
        total: result.total
      }
    }
  }


}