/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 10:52
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/inbound/query`,
    add: `/inboundEdit/add`,
    edit: `/inboundEdit/edit`,
    delete: `inboundEdit/list`,
    saveService: `/portal/rs/inbound/detail`,
      submitService: `/portal/rs/inbound/detail`,
    detailUrl:`/portal/rs/inbound/detail`,
  };
};
export default api;
