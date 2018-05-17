import request from '@utils/request';
import { jsonPOST } from '@utils/request';

export function getUsers() {
  return request('/api/setting/users/all')
}

export function addUser(data) {
  return jsonPOST('/api/setting/users/add', data)
}

export function updateUser(data) {
  return jsonPOST('/api/setting/users/update', data)
}

export function deleteUser(id) {
  return jsonPOST('/api/setting/users/delete', id)
}

export function getGroups() {
  return request('/api/setting/groups/all')
}

export function addGroup(data) {
  return jsonPOST('/api/setting/groups/add', data)
}

export function updateGroup(data) {
  return jsonPOST('/api/setting/groups/update', data)
}

export function deleteGroup(id) {
  return jsonPOST('/api/setting/groups/delete', id)
}

export function deleteGroupUser(data) {
  return jsonPOST('/api/setting/groups/delete/user', data)
}

export function addUserToGroup(data) {
  return jsonPOST('/api/setting/groups/addUser', data)
}

export function getStartScript() {
  return request('/api/setting/startup_script')
}

export function getEnvVar() {
  return request('/api/setting/env_var')
}

export function saveStartScript(data) {
  return jsonPOST('/api/setting/startup_script/save', data)
}

export function saveEnvVar(data) {
  return jsonPOST('/api/setting/env_var/save', data)
}


export function restart() {
  return request('/api/setting/restart')
}

