/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:59
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/queryStockInfo`,
    add: `/batchStockEdit/add`,
    edit: `/batchStockEdit/edit`,
    delete: `batchStockEdit/list`,
    saveService: `/portal/rs/stock/queryStockInfo`,
      submitService: `/portal/rs/stock/queryStockInfo`,
    detailUrl:`/portal/rs/stock/queryStockInfo`,
  };
};
export default api;
