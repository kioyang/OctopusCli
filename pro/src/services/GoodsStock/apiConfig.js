/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:53
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/page`,
    add: `/goodsStock/add`,
    edit: `/goodsStock/edit`,
    delete: `/portal/rs/stock/page`
  };
};
export default api;
