/**
* 定义数据层。
* @author -@haopengit.com
* @date 2020-11-25 19:38
*/

import { getList } from '@/services/FindByMaterial'

const pageSize = 15;
export default {
  namespace: 'findByMaterial', // combineReducer的键
  // 默认值
  state: {
    // 列表数据
    list: [],
    pagination: {
    current: 1,
    pageSize,
    total: 0,
    },
    queryParams: {},
  },

    effects: {
    // 获取列表数据
    *fetch({ payload }, { call, put, select }) {
      const params = yield select(({findByMaterial}) =>{
        return  findByMaterial.queryParams;
      });
      const querys = {...params,...payload};
      const response = yield call(getList, {...params,...payload});
      yield put({
        type: 'save',
        payload: {
          list: response.list,
          pagination: response.pagination,
          queryParams: querys,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // 清空状态
    clear(state, { payload }) {
      return {
        ...state,
        ...payload,
        list: [],
        pagination: {
        current: 1,
        pageSize,
        total: 0,
        },
        queryParams: {}
      };
    },
  },
};