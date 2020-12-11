/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:31
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/outbound/query`,
    add: `/outboundEdit/add`,
    edit: `/outboundEdit/edit`,
    delete: `outboundEdit/list`,
    saveService: `/portal/rs/outbound/query`,
      submitService: `/portal/rs/outbound/query`,
    detailUrl:`/portal/rs/outbound/detail`,
  };
};
export default api;
