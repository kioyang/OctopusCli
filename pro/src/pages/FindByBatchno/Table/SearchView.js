/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-11-25 19:38
*/

import React from 'react'
import { connect } from 'dva'
import { Input, Form, Row, Col, Button,Select,DatePicker } from 'antd';
import styles from './SearchView.less';
import Field from './Field.js';
import BillstatusSelect from '@/components/BillstatusSelect'

const formItemLayout = {
  labelCol: {
    xxl: { span: 8 },
    xl: { span: 8 },
    lg: { span: 12 },
  },
  wrapperCol: {
    xxl: { span: 16 },
    xl: { span: 16 },
    lg: { span: 12 },
  },
};
const responsive = {
  xxl: { span: 6 },
  xl: { span: 12 },
  lg: { span: 12 },
  sm: { span: 24 },
  xs: { span: 24 },
};
const formItemLayoutButton = {
  labelCol: {
    xxl: { span: 0 },
    xl: { span: 0 },
    lg: { span: 0 },
  },
  wrapperCol: {
    xxl: { span: 24 },
    xl: { span: 24 },
    lg: { span: 24 },
  },
};

@connect()
class SearchView extends React.Component {
  static propTypes = {};

  static defaultProps = {};

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
      type: 'findByBatchno/fetch',
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
    return (
      <Form
        ref={(el) => {
          this.form = el;
        }}
        className={styles.searchForm}
        layout={layout}
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <Row>
          <Col {...responsive}>
            <Form.Item
              name={Field.ser}
              className={styles.formItem}
              label="查询条件"
              placeholder="商品代码/商品编码/商品名称"
            >
              <Input placeholder="商品代码/商品编码/商品名称" />
            </Form.Item>
          </Col>
          <Col {...responsive}>
            <Form.Item
              name={Field.storeway}
              className={styles.formItem}
              label="存储方式"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...responsive}>
            <Form.Item
              name={Field.huoguo}
              className={styles.formItem}
              label="货柜号"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...responsive}>
            <Form.Item
              name={Field.btd}
              className={styles.formItem}
              label="按批号查询"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...responsive}>
            <Form.Item
              name={Field.dfe4}
              className={styles.formItem}
              label="商品代码"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...responsive}>
            <Form.Item
              name={Field.qtype}
              className={styles.formItem}
              label="请选择商品品质"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...responsive}>
            <Form.Item
              {...formItemLayoutButton}
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
