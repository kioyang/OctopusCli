import Mock from 'mockjs'
import Field from '../src/pages/StockInAppointmentEdit/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.batchno}`]:'@cname',
             [`${Field.commoditycode|+1}`]:'1',
             [`${Field.commodityname}`]:'@cname',
             [`${Field.model}`]:'@cname',
             [`${Field.packingmeasurement}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.packingmeasurementunitname}`]:'@cname',
             [`${Field.cargomeasurermentunitname}`]:'@cname',
             [`${Field.piecegrossweight}`]:'@cname',
             [`${Field.piecenetweight}`]:'@cname',
             [`${Field.shelflife}`]:'@cname',
             [`${Field.unitprice}`]:'@cname',
             [`${Field.productiondate}`]:'@date',
             [`${Field.expirationdate}`]:'@date',
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
    'GET /stockInAppointmentEdit/list': {
        code: 0,
        ...outList,
    },
    'POST /stockInAppointmentEdit/add': {
        code: 0,
        data: {},
    },
    'POST /stockInAppointmentEdit/edit': {
        code: 0,
        data: {},
    },
};