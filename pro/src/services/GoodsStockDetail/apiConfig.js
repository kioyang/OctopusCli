/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:53
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/page`,
    add: `/goodsStockDetail/add`,
    edit: `/goodsStockDetail/edit`,
    delete: `goodsStockDetail/list`,
     detailUrl: `/portal/rs/stock/page`
  };
};
export default api;
