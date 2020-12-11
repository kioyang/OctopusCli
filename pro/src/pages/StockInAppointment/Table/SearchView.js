/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-11-30 17:12
*/

import React from 'react'
import { connect } from 'dva'
import { Input, Form, Row, Col, Button, Select, DatePicker } from 'antd'
import styles from './SearchView.less'
import Field from './Field.js'
import BillstatusSelect from '@/components/BillstatusSelect'
import TimeRange from '@/components/widgets/TimeField/TimeRange'

import { FormResponsive } from '@/config/style'

const ResponsiveField = {
  [Field.snumber]: { name: '单据编号',offset: 0},
  [Field.planoperationtime]: { name: '入库预约时间',offset: 1},
  sortType: { name: '时间排序',offset:0},
  [Field.billstatus]: { name: '单据状态',offset: -1},
}

@connect()
class SearchView extends React.Component {
  static propTypes = {};

  static defaultProps = {};


  componentDidMount() {
    const { containerScrollHeight } = this.props;
  }
  // 离开页面时清空条件
  componentWillUnmount() {
    this.reset();
  }


  // 获取查询表单数据
  getFormData() {
    return this.form.validateFields();
  }

  getList(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointment/fetch',
      payload: query,
    });
  }


  // 根据查询参数查询列表
  search = () => {
    this.getFormData()
      .then((values) => {
        const keys = Object.keys(values);
        const newValues = {};
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (key === 'planoperationtime') {
            if (values[key]) {
              newValues.planoperationBeginTime = values[key][0];
              newValues.planoperationEndTime = values[key][1];
            }
            continue;
          }
          if (values[keys[i]] === '') {
            newValues[keys[i]] = undefined;
          } else {
            newValues[keys[i]] = values[keys[i]];
          }
        }
        this.getList({
          current: 1,
          ...newValues,
        });
      })
      .catch((errors) => {
        console.log(errors, 'formvalidate');
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
      rows: 4,
      fields: ResponsiveField,
    });
    return (
      <Form
        ref={(el) => {
          this.form = el;
        }}
        className={styles.searchForm}
        layout={layout}
        {...formResponsive.formItemLayout}
        onValuesChange={() => {
          this.search();
        }}
        onSubmit={this.handleSubmit}
      >
        <Row>
          <Col {...formResponsive[Field.snumber]}>
            <Form.Item
              name={Field.snumber}
              className={styles.formItem}
              label="单据编号"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.planoperationtime]}>
            <Form.Item
              name={Field.planoperationtime}
              className={styles.formItem}
              label="入库预约时间"
            >
              <TimeRange />
            </Form.Item>
          </Col>
          <Col {...formResponsive.sortType}>
            <Form.Item
              name='sortType'
              className={styles.formItem}
              label="时间排序"
            >
              <Select>
                <Select.Option value="1">生成时间倒序</Select.Option>
                <Select.Option value="2">生成时间顺序</Select.Option>
                <Select.Option value="3">预约到货倒序</Select.Option>
                <Select.Option value="4">预约到货顺序</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.billstatus]}>
            <Form.Item
              name={Field.billstatus}
              className={styles.formItem}
              label="单据状态"
            >
              <BillstatusSelect />
            </Form.Item>
          </Col>
        </Row>
        <Row className={styles.searchBtn}>
        <Col {...formResponsive.responsive}>
            <Form.Item
              label="&nbsp;&nbsp;"
              colon={false}
              {...formResponsive.formItemLayout}
              className={styles.formItem}
            >
              <Button
                type="primary"
                className={styles.search}
                onClick={this.search}
              >
                查询
              </Button>
              <Button
                onClick={this.reset}
                className={styles.reset}
              >
                重置
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
export default SearchView;
