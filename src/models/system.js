import { getInfo } from '../services/system'

const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default {
  namespace: 'system',

  state: {
    isLoading: true,
    platform: 'KVM',
    hostName: 'iZ28b1b52l9Z',
    publicVersion: 'CentOS 6.5 Final',
    coreVersion: 'Linux 2.6.32-431.23.3.el6.x86_64 #1 SMP Thu Jul 31 17:20:51 UTC 2014',
    cpuNum: 1,
    cpuCore: 'Intel(R) Xeon(R) CPU E5-2682 v4 @ 2.50GHz (64bit)',
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