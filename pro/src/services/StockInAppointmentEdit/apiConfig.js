/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-11-30 17:27
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/inboundAppointment/page`,
    add: `/stockInAppointmentEdit/add`,
    edit: `/stockInAppointmentEdit/edit`,
    delete: `/portal/rs/inboundAppointment/delete`,
    saveService: '/portal/rs/inboundAppointment/add',
    submitService: '/portal/rs/inboundAppointment/add'
  };
};
export default api;
