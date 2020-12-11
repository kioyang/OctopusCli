/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-12-10 11:53
*/

import React from 'react'
import ResponsivePage from '@/components/ResponsivePage'
import ResponsiveBlock from '@/components/ResponsiveBlock'

import TableListView from './TableListView'
import SearchView from './SearchView'
import styles from './Table.less';

class GoodsStock extends React.PureComponent {
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
export default GoodsStock;
