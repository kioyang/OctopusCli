/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-09 16:48
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/outboundappointment/page`,
    add: `/outboundAppointmentEdit/add`,
    edit: `/outboundAppointmentEdit/edit`,
    delete: `outboundAppointmentEdit/list`,
    saveService: '/portal/rs/outboundappointment/add',
    submitService: '/portal/rs/outboundappointment/add',
    detailUrl:`/portal/rs/outboundappointment/detail`,
  };
};
export default api;
