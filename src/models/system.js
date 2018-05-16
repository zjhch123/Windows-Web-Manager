import { getInfo } from '@services/system'

const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default {
  namespace: 'system',

  state: {
    isLoading: true,
    project: {
      total: 0,
      run: 0,
      dead: 0
    },
    time: {
      system: 0,
      start: 0,
      run: 0,
      free: 0,
    },
    cpu: 0,
    memory: {
      total: 0,
      used: 0,
      free: 0,
      buffers: 0,
      cached: 0
    },
    storage: {
      total: 0,
      used: 0,
      free: 0
    }
  },

  effects: {
    *init (action, {put, call}) {
      yield put({ type: 'initInfo', payload: { isLoading: true } })
      const info = yield call(getInfo, null)
      yield call(delay, Math.random() * 1000)
      yield put({ type: 'setInfo', payload: info })
      yield put({ type: 'initInfo', payload: { isLoading: false } })
    },
    *getInfo(action, {put, call}) {
      const info = yield call(getInfo, null)
      yield put({type: 'setInfo', payload: info})
    }
  },

  reducers: {
    initInfo(state, { payload: { isLoading } }) {
      return {
        ...state,
        isLoading: isLoading
      }
    },
    setInfo(state, { payload: { data } }) {
      return {
        ...state,
        project: data.result.project,
        time: data.result.time,
        memory: data.result.memory,
        cpu: data.result.cpu,
        storage: data.result.storage
      }
    }
  }

}