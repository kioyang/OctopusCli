import Mock from 'mockjs'
import Field from '../src/pages/Inbound/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.snumber|+1}`]:'1',
             [`${Field.packingmeasurement}`]:'@cname',
             [`${Field.cargomeasurerment}`]:'@cname',
             [`${Field.qacontrol}`]:'@cname',
             [`${Field.billstatus}|+1`]:'[0,1]',
             [`${Field.grossweight}`]:'@cname',
             [`${Field.netweight}`]:'@cname',
             [`${Field.cargovalue}`]:'@cname',
             [`${Field.operationtime}`]:'@date',
             [`${Field.contractno}`]:'@cname',
             [`${Field.remark}`]:'@cname',
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
    'GET /inbound/list': {
        code: 0,
        ...outList,
    },
    'POST /inbound/add': {
        code: 0,
        data: {},
    },
    'POST /inbound/edit': {
        code: 0,
        data: {},
    },
};