/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-12-09 16:48
*/

import React from 'react'
import ResponsivePage from '@/components/ResponsivePage'
import ResponsiveBlock from '@/components/ResponsiveBlock'

import TableListView from './TableListView'
import SearchView from './SearchView'
import styles from './Table.less';

class OutboundAppointment extends React.PureComponent {
  render() {
    return (
        <ResponsivePage>
        <ResponsiveBlock
          height={80}
        >
          <SearchView {...this.props} />
        </ResponsiveBlock>
        <ResponsiveBlock
        >
          <TableListView {...this.props} />
        </ResponsiveBlock>
      </ResponsivePage>
    );
  }
}
export default OutboundAppointment;
