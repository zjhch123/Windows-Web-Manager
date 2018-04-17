import request from '../utils/request';

export function getInfo() {
  return request('/api/getInfo')
}