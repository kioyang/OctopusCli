/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:53
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/page`,
    add: `/goodsStockEdit/add`,
    edit: `/goodsStockEdit/edit`,
    delete: `goodsStockEdit/list`,
    saveService: `/portal/rs/stock/page`,
      submitService: `/portal/rs/stock/page`,
    detailUrl:`/portal/rs/stock/page`,
  };
};
export default api;
