/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-11-25 19:26
*/
/**
 * 地址传参 可以共享 编写工具统一状态管理 （选中)
 * sessionStorage传参 redux状态管理 适合页面内部状态管理 列表页和编辑页属于两个不同的页面
 * localStorage传参 redux状态管理 适合页面内部状态管理 列表页和编辑页属于两个不同的页面
 * 
 * 数据都存在editList里
 */

import React from 'react'

import ResponsivePage from '@/components/ResponsivePage';
import ResponsiveBlock from '@/components/ResponsiveBlock';

import TableListView from './TableListView'
import SearchView from './SearchView'

class StockInAppointmentDetail extends React.Component {
  render() {
    return (
      <ResponsivePage>
        <ResponsiveBlock
          height={90}
        >
          <SearchView context={this} {...this.props} />
        </ResponsiveBlock>
        <ResponsiveBlock>
          <TableListView {...this.props} context={this} />
        </ResponsiveBlock>
      </ResponsivePage>
    );
  }
}
export default StockInAppointmentDetail;
