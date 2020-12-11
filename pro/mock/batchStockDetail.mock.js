import Mock from 'mockjs'
import Field from '../src/pages/BatchStock/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
    }
        ],
});
const { list } = data;
const outData = list.slice(0, 20);
const outList = {
    code: 0,
    data: outData,
    length: list.length,
};
export default {
    'GET /batchStockDetail/list': {
        code: 0,
        ...outList,
    },
    'POST /batchStockDetail/add': {
        code: 0,
        data: {},
    },
    'POST /batchStockDetail/edit': {
        code: 0,
        data: {},
    },
};