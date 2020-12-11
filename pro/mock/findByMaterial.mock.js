import Mock from 'mockjs'
import Field from '../src/pages/FindByMaterial/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.batchno}`]:'@cname',
             [`${Field.commoditycode|+1}`]:'1',
             [`${Field.commodityNo}`]:'@cname',
             [`${Field.commodityName}`]:'@cname',
             [`${Field.commodityCategoryName}`]:'@cname',
             [`${Field.commoditySpecification}`]:'@cname',
             [`${Field.availablestockqty}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.containerno}`]:'@cname',
             [`${Field.keyword}`]:'@cname',
             [`${Field.conveyway}`]:'@cname',
             [`${Field.huoguo}`]:'@cname',
             [`${Field.rules}`]:'@cname',
             [`${Field.sdate}`]:'@date',
             [`${Field.edate}`]:'@date',
             [`${Field.gtype}`]:'@cname',
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
    'GET /findByMaterial/list': {
        code: 0,
        ...outList,
    },
    'POST /findByMaterial/add': {
        code: 0,
        data: {},
    },
    'POST /findByMaterial/edit': {
        code: 0,
        data: {},
    },
};