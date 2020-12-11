import Mock from 'mockjs'
import Field from '../src/pages/Inbound/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.batchno}`]:'@cname',
             [`${Field.commodityscode|+1}`]:'1',
             [`${Field.commodityname}`]:'@cname',
             [`${Field.qctypename}`]:'@cname',
             [`${Field.packingmeasurement}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.piecegrossweight}`]:'@cname',
             [`${Field.grossweight}`]:'@cname',
             [`${Field.packingmeasurementunitname}`]:'@cname',
             [`${Field.cargomeasurermentunitname}`]:'@cname',
             [`${Field.piecenetweight}`]:'@cname',
             [`${Field.unitprice}`]:'@cname',
             [`${Field.totalmoney}`]:'@cname',
             [`${Field.productiondate}`]:'@date',
             [`${Field.expirationdate}`]:'@date',
             [`${Field.custbatchno}`]:'@cname',
             [`${Field.containerno}`]:'@cname',
             [`${Field.temperature}`]:'@cname',
             [`${Field.origincountry}`]:'@cname',
             [`${Field.plateno}`]:'@cname',
             [`${Field.remarks}`]:'@cname',
             [`${Field.pieceplate}`]:'@cname',
             [`${Field.plate}`]:'@cname',
             [`${Field.kdsnumber|+1}`]:'1',
             [`${Field.kdstorehousename}`]:'@cname',
             [`${Field.kdcontractno}`]:'@cname',
             [`${Field.kdbiztypename}`]:'@cname',
             [`${Field.kdoperationtime}`]:'@date',
             [`${Field.kdqacontrol}`]:'@cname',
             [`${Field.kdmotorman}`]:'@cname',
             [`${Field.kdplateno}`]:'@cname',
             [`${Field.kdremark}`]:'@cname',
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
    'GET /inboundDetail/list': {
        code: 0,
        ...outList,
    },
    'POST /inboundDetail/add': {
        code: 0,
        data: {},
    },
    'POST /inboundDetail/edit': {
        code: 0,
        data: {},
    },
};