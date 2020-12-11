/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-11-30 18:20
*/

import React from 'react'
import TableListView from './TableListView'
import SearchView from './SearchView'
import styles from './Table.less';

import ResponsivePage from '@/components/ResponsivePage';
import ResponsiveBlock from '@/components/ResponsiveBlock';

class InMaterial extends React.PureComponent {
  render() {
    return (
      <ResponsivePage>
        <ResponsiveBlock height={50}>
        <SearchView {...this.props} />
        </ResponsiveBlock>
        <ResponsiveBlock>
        <TableListView {...this.props}/>
        </ResponsiveBlock>
      </ResponsivePage>
    );
  }
}
export default InMaterial;
