/**
* @author -@haopengit.com
* @date 2020-12-09 16:48
*/

/**
 * 地址传参 可以共享 编写工具统一状态管理 （选中)
 * sessionStorage传参
 * localStorage传参 
 */

import React from 'react'

import ResponsivePage from '@/components/ResponsivePage';
import ResponsiveBlock from '@/components/ResponsiveBlock';

import TableListView from './TableListView'
import SearchView from './SearchView'

class OutboundAppointmentDetail extends React.Component {
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
export default OutboundAppointmentDetail;
