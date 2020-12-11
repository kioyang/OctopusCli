/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-12-10 10:51
*/

import { stringify } from 'qs'
import request from '@/utils/request'
import api from './apiConfig'
import Base64Request from '@/utils/Base64Request'

const pageSize = 10;

export async function getList(params) {
  params.page = params.current;
  params.limit = params.pageSize;
  delete params.current;
  delete params.pageSize;
  return request(`${api().list}?${stringify(params)}`).then((res = { content }) => {
    const data = {
      list: res.content && res.content.list,
      pagination: {
        current: params.page,
        pageSize,
        total: res.content && res.content.total,
      },
    };
    return Promise.resolve(data);
  });
}

export async function add(params) {
  return request(`${api().add}?${stringify(params)}`).then(res => {
    return Promise.resolve(res);
  });
}
export async function edit(params) {
  return request(`${api().edit}?${stringify(params)}`).then(res => {
    return Promise.resolve(res);
  });
}

export async function deleteItem(params) {
  return Base64Request(`${api().delete}`, {
    body: params
  });
}