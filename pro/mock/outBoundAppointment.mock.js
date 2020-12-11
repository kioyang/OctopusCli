import Mock from 'mockjs'
import Field from '../src/pages/OutboundAppointment/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.snumber|+1}`]:'1',
             [`${Field.storehousename}`]:'@cname',
             [`${Field.conveywayname}`]:'@cname',
             [`${Field.deliverydotname}`]:'@cname',
             [`${Field.planoperationtime}`]:'@date',
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
    data: outData,
    length: list.length,
};
export default {
    'GET /outboundAppointment/list': {
        code: 0,
        ...outList,
    },
    'POST /outboundAppointment/add': {
        code: 0,
        data: {},
    },
    'POST /outboundAppointment/edit': {
        code: 0,
        data: {},
    },
};