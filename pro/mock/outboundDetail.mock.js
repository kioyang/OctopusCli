import Mock from 'mockjs'
import Field from '../src/pages/Outbound/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.batchno}`]:'@cname',
             [`${Field.commodityscode|+1}`]:'1',
             [`${Field.commodityname}`]:'@cname',
             [`${Field.commodityNo}`]:'@cname',
             [`${Field.packingmeasurement}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.availablestockqty}`]:'@cname',
             [`${Field.custbatchno}`]:'@cname',
             [`${Field.model}`]:'@cname',
             [`${Field.containerno}`]:'@cname',
             [`${Field.qctypename}`]:'@cname',
             [`${Field.origincountry}`]:'@cname',
             [`${Field.warehousename}`]:'@cname',
             [`${Field.packingmeasurementunitname}`]:'@cname',
             [`${Field.cargomeasurermentunitname}`]:'@cname',
             [`${Field.grossweight}`]:'@cname',
             [`${Field.netweight}`]:'@cname',
             [`${Field.unitprice}`]:'@cname',
             [`${Field.totalmoney}`]:'@cname',
             [`${Field.remarks}`]:'@cname',
             [`${Field.snumber|+1}`]:'1',
             [`${Field.storehousename}`]:'@cname',
             [`${Field.contractno}`]:'@cname',
             [`${Field.operationtime}`]:'@date',
             [`${Field.motorman}`]:'@cname',
             [`${Field.plateno}`]:'@cname',
             [`${Field.biztypename}`]:'@cname',
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
    'GET /outboundDetail/list': {
        code: 0,
        ...outList,
    },
    'POST /outboundDetail/add': {
        code: 0,
        data: {},
    },
    'POST /outboundDetail/edit': {
        code: 0,
        data: {},
    },
};