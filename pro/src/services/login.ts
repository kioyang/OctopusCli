import request from '@/utils/request';
import Base64Request from '@/utils/Base64Request'

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function AccountLogin(params: LoginParamsType) {
  return Base64Request('/portal/syslogin.do', {
    method: 'POST',
    body: {...params,isLarge: 'no'},
  });
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
