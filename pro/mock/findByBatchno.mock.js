import Mock from 'mockjs'
import Field from '../src/pages/FindByBatchno/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.commoditycode|+1}`]:'1',
             [`${Field.commodityNo}`]:'@cname',
             [`${Field.commodityName}`]:'@cname',
             [`${Field.availablestockqty}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.qctypeName}`]:'@cname',
             [`${Field.productiondate}`]:'@date',
             [`${Field.commodityCategoryName}`]:'@cname',
             [`${Field.commoditySpecification}`]:'@cname',
             [`${Field.contractid|+1}`]:'1',
             [`${Field.cargoAge}`]:'@cname',
             [`${Field.expirationdate}`]:'@date',
             [`${Field.containerno}`]:'@cname',
             [`${Field.ser}`]:'@cname',
             [`${Field.storeway}`]:'@cname',
             [`${Field.huoguo}`]:'@cname',
             [`${Field.btd}`]:'@cname',
             [`${Field.dfe4}`]:'@cname',
             [`${Field.qtype}`]:'@cname',
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
    'GET /findByBatchno/list': {
        code: 0,
        ...outList,
    },
    'POST /findByBatchno/add': {
        code: 0,
        data: {},
    },
    'POST /findByBatchno/edit': {
        code: 0,
        data: {},
    },
};