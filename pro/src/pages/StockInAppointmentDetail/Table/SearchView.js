/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-11-25 19:26
*/

import React from 'react'
import { connect } from 'dva'
import { Input, Form, Row, Col, Button, Select, DatePicker, Card } from 'antd';
import styles from './SearchView.less';
import Field from './Field.js';
import BillstatusSelect from '@/components/BillstatusSelect'
import { formMap } from './OOMap'
import { OOMTransfer } from '@/utils/OOM'

import { FormResponsive } from '@/config/style'

const ResponsiveField = {
  [Field.snumber]: { name: '单据编号',offset: -1},
  [Field.storehouseid]: { name: '库点',offset: 0},
  [Field.planoperationtime]: { name: '预约入库时间',offset: 1},
  [Field.conveywayid]: { name: '配送方式',offset: 0},
  [Field.motorman]: { name: '司机信息', offset:0},
  [Field.plateno]: { name: '车牌号',offset: 0},
  [Field.remarks]: { name: '备注',offset: 0},
}

import { detailService } from '@/services/StockInAppointmentDetail/index'


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
          type: 'stockInAppointmentDetail/save',
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
            const { context } = this.props;
            context.form = this;
          }}
          className={styles.searchForm}
          layout={layout}
          {...formResponsive.formItemLayout}
          onSubmit={this.handleSubmit}
          initialValues={initialValues}
        >
          <Row>
            <Col {...formResponsive[Field.snumber]}>
              <Form.Item
                name={Field.snumber}
                className={styles.formItem}
                rules={[{ required: true, message: '单据编号不能为空' }]}
                label="单据编号"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...formResponsive[Field.storehouseid]}>
              <Form.Item
                name={Field.storehouseid}
                className={styles.formItem}
                rules={[{ required: true, message: '请选择库点' }]}
                label="库点"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...formResponsive[Field.planoperationtime]}>
              <Form.Item
                name={Field.planoperationtime}
                className={styles.formItem}
                label="入库预约时间"
                rules={[{ required: true, message: '请选择入库预约时间' }]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...formResponsive[Field.conveywayid]}>
              <Form.Item
                name={Field.conveywayid}
                className={styles.formItem}
                rules={[{ required: true, message: '请选择送货方式' }]}
                label="送货方式"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...formResponsive[Field.motorman]}>
              <Form.Item
                name='motorman'
                className={styles.formItem}
                label="司机信息"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...formResponsive[Field.plateno]}>
              <Form.Item
                name='plateno'
                className={styles.formItem}
                label="车牌号"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...formResponsive[Field.remarks]}>
              <Form.Item
                name='remarks'
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
