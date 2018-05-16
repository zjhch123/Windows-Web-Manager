import request from '@utils/request';

export function getUsers() {
  return request('/api/setting/users/all')
}

export function getGroups() {
  return request('/api/setting/groups/all')
}