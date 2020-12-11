import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';

import { AccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

function clearAllCookie() {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  // console.log("需要删除的cookie名字："+keys);
  if (keys) {
      for (var i = keys.length; i--;)
          document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
  }
}
// 2.清除服务器上的session
function clearServerSession() {
  fetch('/portal/session/clear', { method: 'GET' })
      .then(function (response) {
          return response.text();
      })
      .then(function (res) {
          // console.log('返回的信息')
          // location.reload();
      })
      .catch(function (e) {
          // console.log(e);
          // location.reload();
      })
}

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      if (response.success) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/workstation';
            return;
          }
        }
        history.replace(redirect || '/workstation');
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      localStorage.clear();
      sessionStorage.clear();
      clearAllCookie();
      clearServerSession();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/login' && !redirect) {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
