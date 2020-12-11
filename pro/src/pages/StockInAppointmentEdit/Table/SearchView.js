/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-11-25 19:26
*/

import React from 'react'
import { connect } from 'dva'
import { Input, Form, Row, Col, Button,Select,DatePicker,Card } from 'antd';
import styles from './SearchView.less';
import Field from './Field.js';

import BillstatusSelect from '@/components/BillstatusSelect' // 单据状态
import SnumberField from '@/components/widgets/SnumberField' // 单据编号
import StoreHouseField from '@/components/widgets/StoreHouseField' // 库点
import ConveyField from '@/components/widgets/ConveyField' // 配送方式
import DeliveryField from '@/components/widgets/DeliveryField' // 配送点
import TimeField from '@/components/widgets/TimeField' // 时间

import { formMap } from './OOMap'
import { OOMTransfer } from '@/utils/OOM'
import { FormResponsive } from '@/config/style'

import { detailService } from '@/services/StockInAppointmentEdit'

const ModeFunc = {
  add: 'addInit',
  edit: 'editInit'
}
const ResponsiveField = {
  [Field.snumber]: { name: '单据编号',offset: -1},
  [Field.storehouseid]: {name: '库点',offset: -1},
  [Field.planoperationtime]: { name: '预约入库时间',offset: 2},
  [Field.conveywayid]: { name: '送货方式'},
  [Field.motorman]: { name: '司机信息'},
  [Field.plateno]: { name : '车牌号'},
  [Field.remarks]: { name: '备注' },
}

@connect()
class SearchView extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = { initialValues: {}}
  
  // 离开页面时清空条件
  componentWillUnmount() {
    this.reset();
  }
  componentDidMount() {
    const { match = {} } = this.props;
    const { params = {}} = match;
    const { id } = params;
    const mode = id === 'add' ? 'add' : 'edit';
    this[ModeFunc[mode]](id);
  }

  addInit = (id) => {
    console.log('addinit',id)
    this.getSnumber();
  }

  editInit = (id) => {
    console.log('editinit',id);
    this.getDetail({ id});
  }


  // 获取查询表单数据
  getFormData() {
    return this.form.validateFields();
  }

  // 获取单据编号

  getSnumber = () => {
    const that = this;
    fetch('/portal/rs/outboundappointment/snumber', { method: 'POST'})
    .then(response => response.json())
    .then(body => {
        const { content = {}} = body;
        const snumber = content;
        if(this.form) {
        that.form.setFieldsValue({
          snumber: snumber,
        });
      }
    });
}

// 获取详情

getDetail = (params) => {
  detailService(params)
  .then((res) => {
    const { content = {}} = res;
    const setValue = OOMTransfer(content,formMap);
    this.form.setFieldsValue(setValue);
    this.setState({
      initialValues: setValue,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointmentEdit/addRows',
      payload: {
        addedRows: content && content.entryList || [],
      }
    })
  })
}


  // 根据查询参数查询列表
  search = () => {
    this.getFormData()
      .then((values) => {
        const keys = Object.keys(values);
        const newValues = {};
        for (let i = 0; i < keys.length; i++) {
          if (values[keys[i]] === '') {
            newValues[keys[i]] = undefined;
          } else {
            newValues[keys[i]] = values[keys[i]];
          }
        }
        this.getList({
          current: 1,
          pageSize: 10,
          ...newValues,
        });
      })
      .catch((errors) => {
        // console.log(errors, 'formvalidate');
      })

  }

  // 清空查询条件
  reset = () => {
    this.form.resetFields();
    this.search();
  }

  render() {
    const layout = window.innerWidth < 866 ? 'vertical' : 'horizontal';
    const formResponsive = FormResponsive.generate({
      rows:4,
      fields: ResponsiveField,
    })
    const { initialValues = {}} = this.state;
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
              <StoreHouseField />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.planoperationtime]}>
            <Form.Item
              name={Field.planoperationtime}
              className={styles.formItem}
              label="入库预约时间"
              rules={[{ required: true, message: '请选择入库预约时间' }]}
            >
             <TimeField />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.conveywayid]}>
            <Form.Item
              name={Field.conveywayid}
              className={styles.formItem}
              rules={[{ required: true, message: '请选择送货方式' }]}
              label="送货方式"
            >
            <ConveyField />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.motorman]}>
            <Form.Item
              name={Field.motorman}
              className={styles.formItem}
              label="司机信息"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.plateno]}>
            <Form.Item
              name={Field.plateno}
              className={styles.formItem}
              label="车牌号"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.remarks]}>
            <Form.Item
              name={Field.remarks}
              className={styles.formItem}
              label="备注"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      </div>
    );
  }
}
export default SearchView;
