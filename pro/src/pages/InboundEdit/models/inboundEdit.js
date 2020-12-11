/**
* 定义数据层。
* @author -@haopengit.com
* @date 2020-11-30 17:27
*/

import { getList, saveService, submitService } from '@/services/InboundEdit'

const pageSize = 15;
export default {
  namespace: 'inboundEdit', // combineReducer的键
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
    editList: [], // 详情列表
  },

  effects: {
    // 获取列表数据
    *fetch({ payload }, { call, put, select }) {
      const params = yield select(({ inboundEdit }) => {
        return inboundEdit.queryParams;
      });
      const querys = { ...params, ...payload };
      const response = yield call(getList, { ...params, ...payload });
      yield put({
        type: 'save',
        payload: {
          list: response.list,
          pagination: response.pagination,
          queryParams: querys,
        },
      });
    },
    // 保存入库单
    *saveObject({ payload }, { call, put, select }) {
      const { params } = payload;
      const response = yield call(saveService, params);
      yield put({
        type: 'save',
        payload: {
        },
      });
      return response;
    },
    *addRow({ payload }, { call, put, select }) {
      const { row } = payload;
      const editList = yield select(({ inboundEdit }) => {
        return inboundEdit.editList;
      }) || [];
      // editList长度作为onlyid
      const len = editList.length || 0;
      yield put({
        type: 'save',
        payload: {
          editList: [...editList, { ...row, onlyid: len + 1 }],
        }
      });
    },
    *deleteRow({ payload }, { call, put, select }) {
      const { row } = payload;
      const editList = yield select(({ inboundEdit }) => {
        return inboundEdit.editList;
      }) || [];
      const dataSource = [...editList];

      yield put({
        type: 'save',
        payload: {
          editList: dataSource.filter(item => item.onlyid !== row.onlyid),
        }
      });
    },
    *modifyRow({ payload }, { call, put, select }) {
      const { row } = payload;
      const editList = yield select(({ inboundEdit }) => {
        return inboundEdit.editList;
      });

      const newData = [...editList];
      const index = newData.findIndex(item => row.onlyid === item.onlyid);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      yield put({
        type: 'save',
        payload: {
          editList: newData,
        }
      });
    },

    *addRows({ payload }, { call, put, select }) {
      const { addedRows = [] } = payload;
      const editList = yield select(({ inboundEdit }) => {
        return inboundEdit.editList;
      }) || [];
      // editList长度作为onlyid
      const len = editList.length || 0;
      const newData = addedRows && addedRows.map((item, index) => {
        return {...item,onlyid: len + 1 + index};
      });
      yield put({
        type: 'save',
        payload: {
          editList: [...editList, ...newData],
        }
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
        queryParams: {},
        editList: []
      };
    },
  },
};
