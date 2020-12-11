/**
* 定义前端与后端字段映射
* @author -@haopengit.com
* @date 
*/
const field = {
        batchno: 'batchno', // 商品批号
        commodityNo: 'commodityNo', // 商品编码
        commodityCode: 'commodityCode', // 商品代码
        commodityName: 'commodityName', // 商品名称
        commoditySpecification: 'commoditySpecification', // 商品规格
        containerno: 'containerno', // 货柜号
        storageMethodName: 'storageMethodName', // 储存方式
        qctypename: 'qctypename', // 品质类型
        packingmeasurement: 'packingmeasurement', // 库存箱数
        qty: 'qty', // 库存小包数
        lockqty: 'lockqty', // 库存锁库小包数
        availablestockqty: 'availablestockqty', // 可用库存小包数
        productiondate: 'productiondate', // 生产日期
        expirationdate: 'expirationdate', // 质保日期
        cargoage: 'cargoage', // 货龄(天)
};
export default field;