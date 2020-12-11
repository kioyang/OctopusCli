/**
* 定义数据层。
* @author kio-@haopengit.com
* @date 2020-12-10 11:59
*/

import { getList,saveService,submitService } from '@/services/BatchStockDetail'

const pageSize = 15;
export default {
  namespace: 'batchStockDetail', // combineReducer的键
  // 默认值
  state: {
    // 列表数据
    detailList: [],
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
      const params = yield select(({ batchStockDetail }) =>{
        return  batchStockDetail.queryParams;
      });
      const querys = {...params,...payload};
      const response = yield call(getList, {...params,...payload});
      yield put({
        type: 'save',
        payload: {
          detailList: response.list,
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
        detailList: [],
        pagination: {
        current: 1,
        pageSize,
        total: 0,
        },
        queryParams: {},
      };
    },
  },
};