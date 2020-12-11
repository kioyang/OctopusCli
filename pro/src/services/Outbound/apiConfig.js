/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:31
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/outbound/query`,
    add: `/outbound/add`,
    edit: `/outbound/edit`,
    delete: `/portal/rs/outbound/query`
  };
};
export default api;
