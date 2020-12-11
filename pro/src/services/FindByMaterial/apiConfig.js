/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-11-25 19:38
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/findByMaterial?page=1&limit=50&warehouseid=K3GYOLc1ad133fd7dd485f9c76a1c69937fea0&_=1606302446041`,
    add: `/findByMaterial/add`,
    edit: `/findByMaterial/edit`,
    delete: `/portal/rs/outboundappointment/delete`
  };
};
export default api;
