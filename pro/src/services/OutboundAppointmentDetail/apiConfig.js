/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-09 16:48
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/outboundappointment/page`,
    add: `/outboundAppointmentDetail/add`,
    edit: `/outboundAppointmentDetail/edit`,
    delete: `outboundAppointmentDetail/list`,
     detailUrl: `/portal/rs/outboundappointment/detail`
  };
};
export default api;
