import { jsonPOST } from '@utils/request';
export function login(data) {
  return jsonPOST('/api/login', data);
}
