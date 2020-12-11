import Mock from 'mockjs'
import Field from '../src/pages/StockInAppointment/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.snumber|+1}`]:'1',
             [`${Field.storehousename}`]:'@cname',
             [`${Field.planoperationtime}`]:'@date',
             [`${Field.packingmeasurement}`]:'@cname',
             [`${Field.cargomeasurerment}`]:'@cname',
             [`${Field.grossweight}`]:'@cname',
             [`${Field.netweight}`]:'@cname',
             [`${Field.cargovalue}`]:'@cname',
             [`${Field.billstatus}|+1`]:'[0,1]',
             [`${Field.remarks}`]:'@cname',
    }
        ],
});
const { list } = data;
const outData = list.slice(0, 20);
const outList = {
    code: 0,
    content: {list:outData,total:500},
    length: list.length,
};
export default {
    'GET /stockInAppointment/list': {
        code: 0,
        ...outList,
    },
    'POST /stockInAppointment/add': {
        code: 0,
        data: {},
    },
    'POST /stockInAppointment/edit': {
        code: 0,
        data: {},
    },
};