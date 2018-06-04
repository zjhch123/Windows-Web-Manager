import request from '@utils/request';
import { jsonPOST } from '@utils/request';
import qs from 'querystring';

export function getProjects(condition) {
  return request(`/api/project/all?${qs.stringify(condition)}`)
}

export function addProject(data) {
  return request('/api/project/add', {
    method: 'POST',
    body: data
  })
}

export function getProject(id) {
  return request(`/api/project/get?id=${id}`)
}

export function changeStatus(data) {
  /*
    {
      ids: 1,2,3,4,
      status: 1
    }
  */
  return jsonPOST(`/api/project/changeStatus`, data)
}

export function deleteProject(data) {
  /*
    {
      ids: 1,2,3,4
    }
  */
  return jsonPOST(`/api/project/delete`, data)
}

export function updateProject(data) {
  return request('/api/project/update', {
    method: 'POST',
    body: data
  })
}
