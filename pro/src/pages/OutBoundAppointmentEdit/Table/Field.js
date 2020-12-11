/**
* 定义前端与后端字段映射
* @author -@haopengit.com
* @date 
*/
const field = {
        commoditycode: 'commoditycode', // 商品代码
        batchno: 'batchno', // 商品批号
        commodityname: 'commodityname', // 商品名称
        model: 'model', // 商品规格
        availablestockqty: 'availablestockqty', // 可用库存
        qty: 'qty', // 小包数
        cargomeasurermentunitname: 'cargomeasurermentunitname', // 小包数单位
        piecegrossweight: 'piecegrossweight', // 件毛重（kg）
        piecenetweight: 'piecenetweight', // 件净重(kg)
        shelflife: 'shelflife', // 保质期
        unitprice: 'unitprice', // 单价
        productiondate: 'productiondate', // 生产日期
        expirationdate: 'expirationdate', // 质保日期
        snumber: 'snumber', // 单据编号
        storehousename: 'storehousename', // 库点
        planoperationtime: 'planoperationtime', // 出库预约时间
        conveywayname: 'conveywayname', // 送货方式
        deliverydotname: 'deliverydotname', // 配送点
        motorman: 'motorman', // 司机信息
        plateno: 'plateno', // 车牌号
        remarks: 'remarks', // 备注
        storehouseid: 'storehouseid',
        conveywayid: 'conveywayid',
        deliverydotid: 'deliverydotid'
};
export default field;