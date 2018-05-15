import request from '@utils/request';

export function getProjects() {
  return request('/api/getProjects')
}

export function addProject(data) {
  return request('/api/addProject', {
    method: 'POST',
    body: data
  })
}

export function getProject(id) {
  return request(`/api/getProject?id=${id}`)
}