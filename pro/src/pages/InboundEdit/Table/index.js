/**
* @author kio-@haopengit.com
* @date 2020-12-10 10:52
*/
/**
 * 地址传参 可以共享 编写工具统一状态管理 （选中)
 * sessionStorage传参 redux状态管理 适合页面内部状态管理 列表页和编辑页属于两个不同的页面
 * localStorage传参 redux状态管理 适合页面内部状态管理 列表页和编辑页属于两个不同的页面
 * 
 * 数据都存在editList里
 */

import React from 'react'

import ResponsivePage from '@/components/ResponsivePage'
import ResponsiveBlock from '@/components/ResponsiveBlock'

import TableListView from './TableListView'
import SearchView from './SearchView'

import { Link } from 'umi'
import { connect } from 'dva';
import { Button, message, Card } from 'antd';


import { formMap } from './OOMap'
import { OOMTransfer } from '@/utils/OOM'

class Index extends React.Component {

  componentDidMount() {
    const { match = {} } = this.props;
    const { params = {}} = match;
    const { id } = params;
    this.id = id;
  }

  // 获取表单数据
  getFormData = () => {
    const { form, tableForm } = this;
    if (form) {
      return form.getFormData()
        .then((values) => {
          return values;
        })
    } else {
      return new Promise((resolve) => {
        resolve();
      });
    }
  }

  //处理我的逻辑
  handleMyLogic = (params) => {
    const { editList } = this.props;
    const transferedData = OOMTransfer(params, formMap);
    const receipe = {
      ...transferedData,
      entryList: editList
    };
    return receipe;
  }

  // 保存或提交
  save = (type) => {
    const that = this;
    const { tableForm } = this;
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      tableForm.validateFields().then((values) => {
        this.getFormData()
          .then((params) => {
            let result = this.handleMyLogic(params);
            const pms = this.id && this.id !== 'add' ? {...result,id: this.id,operStatus:type} : {...result,operStatus:'add'};
            dispatch({
              type: 'inboundEdit/saveObject',
              payload: { params: { ...pms } }
            })
              .then((res) => {
                resolve(res);
              })
          })
      })
        .catch((e) => {
          console.log(e, 'error');
          const { errorFields } = e;
          const first = errorFields[0];
          tableForm.scrollToField(first.name[0]);
        })
    })
  }


  render() {
    return (
      <ResponsivePage>
        <ResponsiveBlock
          height={82}
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
// indexpage
export default connect(({ inboundEdit , loading }) => {
  return {
    editList: inboundEdit.editList, // 为了提交获取editList
    loading: loading.effects['inboundEdit/saveObject'] || false,
  }
})(Index);
