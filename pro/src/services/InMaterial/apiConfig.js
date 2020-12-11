/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-11-30 18:20
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/material/page`,
    add: `/inMaterial/add`,
    edit: `/inMaterial/edit`,
    delete: `/portal/rs/inboundAppointment/delete`
  };
};
export default api;
