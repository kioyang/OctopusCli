import Mock from 'mockjs'
import Field from '../src/pages/InMaterial/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.sort}`]:'@cname',
             [`${Field.scode|+1}`]:'1',
             [`${Field.sname}`]:'@cname',
             [`${Field.materialdicname}`]:'@cname',
             [`${Field.materialmodel}`]:'@cname',
             [`${Field.maxunitname}`]:'@cname',
             [`${Field.minunitname}`]:'@cname',
             [`${Field.savemodename}`]:'@cname',
             [`${Field.grossweight}`]:'@cname',
             [`${Field.netweight}`]:'@cname',
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
    'GET /inMaterial/list': {
        code: 0,
        ...outList,
    },
    'POST /inMaterial/add': {
        code: 0,
        data: {},
    },
    'POST /inMaterial/edit': {
        code: 0,
        data: {},
    },
};