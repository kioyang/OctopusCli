/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-11-25 19:38
*/

import React from 'react'

import ResponsivePage from '@/components/ResponsivePage'
import ResponsiveBlock from '@/components/ResponsiveBlock'
import TableListView from './TableListView'
import SearchView from './SearchView'
import styles from './Table.less';

class FindByBatchno extends React.PureComponent {
  render() {
    return (
      <ResponsivePage className={styles.customTable}>
        <ResponsiveBlock
          height={100}
        >
          <SearchView />
        </ResponsiveBlock>
        <ResponsiveBlock>
          <TableListView {...this.props} />
        </ResponsiveBlock>
      </ResponsivePage>
    );
  }
}
export default FindByBatchno;
