import request from '@utils/request';
import { jsonPOST } from '@utils/request';

export function getInfo() {
  return request('/api/env/runtime')
}


export function getInstalled() {
  return request('/api/env/installed')
}

export function getServices() {
  return request('/api/env/services')
}

export function install(name) {
  return jsonPOST('/api/env/services/install', name)
}

export function getFirstPath() {
  return request('/api/env/firstPath')
}

export function addFirstPath(data) {
  /*
    {
      absPath:"/var/www",
      env:"httpd",
      firstPath:"www.hduzplus.xyz",
      port:"80",
      schema:"http"
    }
  */
  return jsonPOST('/api/env/firstPath/add', data)
}