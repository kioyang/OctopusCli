/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-11-30 17:12
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/inboundAppointment/page`,
    // list: `/stockInAppointment/list`,
    edit: `/stockInAppointment/edit`,
    delete: `/portal/rs/inboundAppointment/delete`
  };
};
export default api;
