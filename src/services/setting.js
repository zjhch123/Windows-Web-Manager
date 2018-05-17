import request from '@utils/request';

export function getUsers() {
  return request('/api/setting/users/all')
}

export function addUser(data) {
  return request('/api/setting/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}

export function updateUser(data) {
  return request('/api/setting/users/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}

export function deleteUser(ids) {
  return request('/api/setting/users/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ids})
  })
}

export function getGroups() {
  return request('/api/setting/groups/all')
}

export function addGroup(data) {
  return request('/api/setting/groups/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}

export function updateGroup(data) {
  return request('/api/setting/groups/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}

export function deleteGroup(ids) {
  return request('/api/setting/groups/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ids})
  })
}

export function deleteGroupUser(ids) {
  return request('/api/setting/groups/delete/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ids})
  })
}