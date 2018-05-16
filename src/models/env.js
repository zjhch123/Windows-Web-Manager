import { getInfo, getInstalled, getServices, getFirstPath } from '@services/env'

export default {
  namespace: 'env',

  state: {
    info: {},
    installed: [],
    isLaunch: false,
    services: {},
    firstPath: []
  },

  effects: {
    *info(action, { put, call }) {
      const data = yield call(getInfo)
      yield put({type: 'setInfo', payload: { result: data.data.result }})
    },
    *installed(action, { put, call }) {
      const data = yield call(getInstalled)
      yield put({type: 'setInstalled', payload: { result: data.data.result }})
    },
    *services(action, { put, call }) {
      const data = yield call(getServices)
      yield put({type: 'setServices', payload: { result: data.data.result }})
    },
    *firstPath(action, { put, call }) {
      const data = yield call(getFirstPath)
      yield put({type: 'setFirstPath', payload: { result: data.data.result }})
    }
  },

  reducers: {
    setInfo(state, { payload: { result } }) {
      return {
        ...state,
        info: result,
        isLaunch: true
      }
    },
    setInstalled(state, { payload: { result } }) {
      return {
        ...state,
        installed: result
      }
    },
    setServices(state, { payload: { result } }) {
      return {
        ...state,
        services: result
      }
    },
    setFirstPath(state, { payload: { result } }) {
      return {
        ...state,
        firstPath: result
      }
    }
  }


}