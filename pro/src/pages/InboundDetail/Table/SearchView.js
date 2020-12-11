/**
* @author -@haopengit.com
* @date 2020-12-10 10:51
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
  [Field.kdsnumber]: { name: '入库单号',offset: 0},
  [Field.kdstorehousename]: { name: '库点',offset: 0},
  [Field.kdcontractno]: { name: '合同编号',offset: 0},
  [Field.kdbiztypename]: { name: '业务类型',offset: 0},
  [Field.kdoperationtime]: { name: '入库时间',offset: 0},
  [Field.kdqacontrol]: { name: 'QA控制',offset: 0},
  [Field.kdmotorman]: { name: '司机信息',offset: 0},
  [Field.kdplateno]: { name: '车牌号',offset: 0},
  [Field.kdremark]: { name: '备注',offset: 0},
  }

import { detailService } from '@/services/InboundDetail/index'


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
          type: 'inboundDetail/save',
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
          <Col {...formResponsive[Field.kdsnumber]}>
            <Form.Item
              disabled
              name={Field.kdsnumber}
              className={styles.formItem}
              label="入库单号"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdstorehousename]}>
            <Form.Item
              disabled
              name={Field.kdstorehousename}
              className={styles.formItem}
              label="库点"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdcontractno]}>
            <Form.Item
              disabled
              name={Field.kdcontractno}
              className={styles.formItem}
              label="合同编号"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdbiztypename]}>
            <Form.Item
              disabled
              name={Field.kdbiztypename}
              className={styles.formItem}
              label="业务类型"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdoperationtime]}>
            <Form.Item
              disabled
              name={Field.kdoperationtime}
              className={styles.formItem}
              label="入库时间"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdqacontrol]}>
            <Form.Item
              disabled
              name={Field.kdqacontrol}
              className={styles.formItem}
              label="QA控制"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdmotorman]}>
            <Form.Item
              disabled
              name={Field.kdmotorman}
              className={styles.formItem}
              label="司机信息"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdplateno]}>
            <Form.Item
              disabled
              name={Field.kdplateno}
              className={styles.formItem}
              label="车牌号"
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.kdremark]}>
            <Form.Item
              disabled
              name={Field.kdremark}
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
