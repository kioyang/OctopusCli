import Mock from 'mockjs'
import Field from '../src/pages/OutboundAppointment/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.commoditycode|+1}`]:'1',
             [`${Field.batchno}`]:'@cname',
             [`${Field.commodityname}`]:'@cname',
             [`${Field.model}`]:'@cname',
             [`${Field.availablestockqty}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.piecegrossweight}`]:'@cname',
             [`${Field.piecenetweight}`]:'@cname',
             [`${Field.unitprice}`]:'@cname',
             [`${Field.productiondate}`]:'@date',
             [`${Field.expirationdate}`]:'@date',
             [`${Field.snumber|+1}`]:'1',
             [`${Field.storehousename}`]:'@cname',
             [`${Field.planoperationtime}`]:'@date',
             [`${Field.conveywayname}`]:'@cname',
             [`${Field.deliverydotname}`]:'@cname',
             [`${Field.motorman}`]:'@cname',
             [`${Field.plateno}`]:'@cname',
             [`${Field.remarks}`]:'@cname',
             [`${Field.columnd}`]:'@cname',
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
    'GET /outboundAppointmentDetail/list': {
        code: 0,
        ...outList,
    },
    'POST /outboundAppointmentDetail/add': {
        code: 0,
        data: {},
    },
    'POST /outboundAppointmentDetail/edit': {
        code: 0,
        data: {},
    },
};