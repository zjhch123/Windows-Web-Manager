import request from '@utils/request';

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
  return request('/api/env/services/install', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({name})
  })
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
  return request('/api/env/firstPath/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  })
}