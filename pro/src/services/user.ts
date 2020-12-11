import request from '@/utils/request';
import Base64Request from '@/utils/Base64Request'

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function getSessionUser() {
  return request('/portal/sysmenu.do/getSessionUser', {
    method: 'POST',credentials: 'include',
  });
}