import { login } from '@services/user'

export default {
  namespace: 'user',

  state: {
    isLogin: JSON.parse(window.localStorage.getItem('isLogin') || 'false'),
    message: null,
    token: window.localStorage.getItem('token') || null
  },
  
  effects: {
    *login ({type, payload}, {put, call}) {
      const result = yield call (login, payload)
      if (result.data.code != 200) {
        yield put ({ type: 'set', payload: { isLogin: false, token: null, message: '用户名密码错误' }})
      } else {
        yield put ({ type: 'set', payload: { isLogin: true, token: result.data.token }})
        if (payload.remember) {
          window.localStorage.setItem('isLogin', true)
          window.localStorage.setItem('token', result.data.token)
        }
      }
    }
  },

  reducers: {
    set (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    logout (state) {
      window.localStorage.removeItem('isLogin')
      return {
        ...state,
        isLogin: false
      }
    }
  }

}