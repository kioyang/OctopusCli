import Mock from 'mockjs'
import Field from '../src/pages/GoodsStock/Table/Field.js'

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
    'GET /goodsStockEdit/list': {
        code: 0,
        ...outList,
    },
    'POST /goodsStockEdit/add': {
        code: 0,
        data: {},
    },
    'POST /goodsStockEdit/edit': {
        code: 0,
        data: {},
    },
};