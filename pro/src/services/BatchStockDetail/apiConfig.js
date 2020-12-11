/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:59
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/queryStockInfo`,
    add: `/batchStockDetail/add`,
    edit: `/batchStockDetail/edit`,
    delete: `batchStockDetail/list`,
     detailUrl: `/portal/rs/stock/queryStockInfo`
  };
};
export default api;
