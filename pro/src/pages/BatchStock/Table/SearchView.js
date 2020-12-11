/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-12-10 11:59
*/

import React from 'react'
import { connect } from 'dva'
import { Input, Form, Row, Col, Button,Select,DatePicker } from 'antd';
import styles from './SearchView.less';
import Field from './Field.js';
import BillstatusSelect from '@/components/BillstatusSelect'

import { FormResponsive } from '@/config/style'

const ResponsiveField ={
[Field.commodityCode]: { name: '商品代码',offset: 0},
[Field.commodityName]: { name: '商品名称',offset: 0},
[Field.productiondate]: { name: '生产日期',offset: 0},
[Field.expirationdate]: { name: '质保日期',offset: 0},
}

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
      type: 'batchStock/fetch',
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
            onValuesChange={() => {
          this.search();
        }}
        {...formResponsive.formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <Row>
          <Col {...formResponsive[Field.commodityCode]}>
            <Form.Item
              name={Field.commodityCode}
              className={styles.formItem}
              label="商品代码"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.commodityName]}>
            <Form.Item
              name={Field.commodityName}
              className={styles.formItem}
              label="商品名称"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.productiondate]}>
            <Form.Item
              name={Field.productiondate}
              className={styles.formItem}
              label="生产日期"
            >
              <DatePicker style={{width: "100%"}} />
            </Form.Item>
          </Col>
          <Col {...formResponsive[Field.expirationdate]}>
            <Form.Item
              name={Field.expirationdate}
              className={styles.formItem}
              label="质保日期"
            >
              <DatePicker style={{width: "100%"}} />
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
