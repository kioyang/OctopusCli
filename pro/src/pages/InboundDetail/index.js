/**
* @author -@haopengit.com
* @date 2020-12-10 10:51
 * 将路由信息传递到下级
 * 一个外壳 方便导出
*/

import React from 'react'
import { Drawer } from 'antd'
import TableView from './Table'

export default function(props) {
  return (
    <Drawer
      width="79%"
      title=""
      bodyStyle={ {padding:0,margin:0,background: '#f0f2f5'} }
      placement="right"
      closable={false}
      visible={true}
    >
      <TableView {...props} />
    </Drawer>  );
}
