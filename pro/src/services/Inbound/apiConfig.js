/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 10:51
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/inbound/query`,
    add: `/inbound/add`,
    edit: `/inbound/edit`,
    delete: `/portal/rs/inbound/query`
  };
};
export default api;
