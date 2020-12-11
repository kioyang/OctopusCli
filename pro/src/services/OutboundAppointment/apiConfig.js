/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-09 16:48
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/outboundappointment/page`,
    add: `/outboundAppointment/add`,
    edit: `/outboundAppointment/edit`,
    delete: `/portal/rs/outboundappointment/delete`
  };
};
export default api;
