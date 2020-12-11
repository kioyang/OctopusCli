/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-11-25 19:38
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/findByBatchNo?page=1&limit=50&warehouseid=K3GYOLc1ad133fd7dd485f9c76a1c69937fea0&sname=&commoditycategory=&keyword=&custid=Q1UWFU_7e3b9dcfde7b4bd1ad1740fe2c241a7b&sort=&storagemethod=&contractid=&productionBeginTime=&productionEndTime=&batchno=&commodityCode=&qctype=&containerno=&_=1606302446040`,
    add: `/findByBatchno/add`,
    edit: `/findByBatchno/edit`,
    delete: `/portal/rs/outboundappointment/delete`
  };
};
export default api;
