import request from '../utils/request';

export function login(data) {
  return request('/api/login', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": 'application/json;charset=utf-8'
    }
  });
}
