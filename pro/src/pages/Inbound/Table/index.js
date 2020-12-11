/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-12-10 10:51
*/

import React from 'react'
import ResponsivePage from '@/components/ResponsivePage'
import ResponsiveBlock from '@/components/ResponsiveBlock'

import TableListView from './TableListView'
import SearchView from './SearchView'
import styles from './Table.less';

class Inbound extends React.PureComponent {
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
export default Inbound;
