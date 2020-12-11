import Mock from 'mockjs'
import Field from '../src/pages/Outbound/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.snumber|+1}`]:'1',
             [`${Field.storehousename}`]:'@cname',
             [`${Field.billstatus}|+1`]:'[0,1]',
             [`${Field.contractno}`]:'@cname',
             [`${Field.packingmeasurement}`]:'@cname',
             [`${Field.cargomeasurerment}`]:'@cname',
             [`${Field.grossweight}`]:'@cname',
             [`${Field.netweight}`]:'@cname',
             [`${Field.cargovalue}`]:'@cname',
             [`${Field.operationtime}`]:'@date',
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
    'GET /outbound/list': {
        code: 0,
        ...outList,
    },
    'POST /outbound/add': {
        code: 0,
        data: {},
    },
    'POST /outbound/edit': {
        code: 0,
        data: {},
    },
};