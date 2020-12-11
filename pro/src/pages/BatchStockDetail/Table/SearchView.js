/**
* @author -@haopengit.com
* @date 2020-12-10 11:59
*/

import React from 'react'
import { connect } from 'dva'
import { Input, Form, Row, Col, Button, Select, DatePicker, Card } from 'antd';
import styles from './SearchView.less';
import Field from './Field.js';
import { formMap } from './OOMap'
import { OOMTransfer } from '@/utils/OOM'
import StoreHouseField from '@/components/widgets/StoreHouseField' // 库点
import ConveyField from '@/components/widgets/ConveyField' // 配送方式
import TimeField from '@/components/widgets/TimeField'
import BillstatusSelect from '@/components/BillstatusSelect'

import { FormResponsive } from '@/config/style'

const ResponsiveField ={
  }

import { detailService } from '@/services/BatchStockDetail/index'


@connect()
class SearchView extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = { initialValues: {} }
  // 离开页面时清空条件
  componentWillUnmount() {
    this.form.resetFields();
  }
  componentDidMount() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { id } = params;
    this.getDetail({id});
  }

  // 获取详情

  getDetail = (params) => {
    detailService(params)
      .then((res) => {
        const { content = {} } = res;
        const setValue = OOMTransfer(content, formMap);
        this.form.setFieldsValue(setValue);
        this.setState({
          initialValues: setValue,
        });
        const { dispatch } = this.props;
        dispatch({
          type: 'batchStockDetail/save',
          payload: {
            detailList: content && content.entryList || [],
          }
        })
      })
  }

  render() {
    const layout = window.innerWidth < 866 ? 'vertical' : 'horizontal';
    const { initialValues = {} } = this.state;
    const formResponsive = FormResponsive.generate({
      rows:4,
      fields: ResponsiveField,
    })
    return (
      <div>
        <Form
        ref={(el) => {
          this.form = el;
        }}
        className={styles.searchForm}
        layout={layout}
        {...formResponsive.formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <Row>
        </Row>
        </Form>
      </div>
    );
  }
}
export default SearchView;
