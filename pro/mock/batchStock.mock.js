import Mock from 'mockjs'
import Field from '../src/pages/BatchStock/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.batchno}`]:'@cname',
             [`${Field.commodityNo}`]:'@cname',
             [`${Field.commodityCode|+1}`]:'1',
             [`${Field.commodityName}`]:'@cname',
             [`${Field.commoditySpecification}`]:'@cname',
             [`${Field.containerno}`]:'@cname',
             [`${Field.storageMethodName}`]:'@cname',
             [`${Field.qctypename}`]:'@cname',
             [`${Field.packingmeasurement}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.lockqty}`]:'@cname',
             [`${Field.availablestockqty}`]:'@cname',
             [`${Field.productiondate}`]:'@date',
             [`${Field.expirationdate}`]:'@date',
             [`${Field.cargoage}`]:'@cname',
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
    'GET /batchStock/list': {
        code: 0,
        ...outList,
    },
    'POST /batchStock/add': {
        code: 0,
        data: {},
    },
    'POST /batchStock/edit': {
        code: 0,
        data: {},
    },
};