/**
* @author -@haopengit.com
* @date 2020-12-10 11:31
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
  [Field.snumber]: { name: '出库单号',offset: 0},
  [Field.storehousename]: { name: '库点',offset: 0},
  [Field.contractno]: { name: '合同编号',offset: 0},
  [Field.operationtime]: { name: '实际出库时间',offset: 0},
  [Field.motorman]: { name: '司机信息',offset: 0},
  [Field.plateno]: { name: '车牌号',offset: 0},
  [Field.biztypename]: { name: '业务类型',offset: 0},
  [Field.remark]: { name: '备注',offset: 0},
  }

import { detailService } from '@/services/OutboundDetail/index'


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
          type: 'outboundDetail/save',
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
          <Col {...formResponsive[Field.snumber]}>
            <Form.Item
              disabled
              name={Field.snumber}
              className={styles.formItem}
              label="出库单号"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.storehousename]}>
            <Form.Item
              disabled
              name={Field.storehousename}
              className={styles.formItem}
              label="库点"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.contractno]}>
            <Form.Item
              disabled
              name={Field.contractno}
              className={styles.formItem}
              label="合同编号"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.operationtime]}>
            <Form.Item
              disabled
              name={Field.operationtime}
              className={styles.formItem}
              label="实际出库时间"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.motorman]}>
            <Form.Item
              disabled
              name={Field.motorman}
              className={styles.formItem}
              label="司机信息"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.plateno]}>
            <Form.Item
              disabled
              name={Field.plateno}
              className={styles.formItem}
              label="车牌号"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.biztypename]}>
            <Form.Item
              disabled
              name={Field.biztypename}
              className={styles.formItem}
              label="业务类型"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.remark]}>
            <Form.Item
              disabled
              name={Field.remark}
              className={styles.formItem}
              label="备注"
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        </Form>
      </div>
    );
  }
}
export default SearchView;
