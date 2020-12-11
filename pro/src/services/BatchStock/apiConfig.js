/**
* api地址生成。
* @author -@haopengit.com
* @date 2020-12-10 11:59
*/
const api = (options) => {
  // const { id } = options;
  return {
    list: `/portal/rs/stock/queryStockInfo`,
    add: `/batchStock/add`,
    edit: `/batchStock/edit`,
    delete: `/portal/rs/stock/queryStockInfo`
  };
};
export default api;
