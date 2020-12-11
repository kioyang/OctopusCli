import Mock from 'mockjs'
import Field from '../src/pages/Outbound/Table/Field.js'

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
    'GET /outboundEdit/list': {
        code: 0,
        ...outList,
    },
    'POST /outboundEdit/add': {
        code: 0,
        data: {},
    },
    'POST /outboundEdit/edit': {
        code: 0,
        data: {},
    },
};