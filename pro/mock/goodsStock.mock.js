import Mock from 'mockjs'
import Field from '../src/pages/GoodsStock/Table/Field.js'

const data = Mock.mock({
    'list|10-50': [{
             [`${Field.commodityNo}`]:'@cname',
             [`${Field.commoditycode|+1}`]:'1',
             [`${Field.commodityName}`]:'@cname',
             [`${Field.minMeasureUnitName}`]:'@cname',
             [`${Field.qty}`]:'@cname',
             [`${Field.availablestockqty}`]:'@cname',
             [`${Field.lockqty}`]:'@cname',
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
    'GET /goodsStock/list': {
        code: 0,
        ...outList,
    },
    'POST /goodsStock/add': {
        code: 0,
        data: {},
    },
    'POST /goodsStock/edit': {
        code: 0,
        data: {},
    },
};