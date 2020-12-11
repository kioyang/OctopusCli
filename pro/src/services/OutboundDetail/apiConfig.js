/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:31
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/outbound/query`,
    add: `/outboundDetail/add`,
    edit: `/outboundDetail/edit`,
    delete: `outboundDetail/list`,
     detailUrl: `/portal/rs/outbound/detail`
  };
};
export default api;
