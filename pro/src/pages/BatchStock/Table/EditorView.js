/**
* 定义请求方法。
* @author -@haopengit.com
* @date 2020-12-10 11:59
*/

import React from 'react'
import { Button, Form, message, Input, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import { add } from '@/services/BatchStock/index';
import {Mode} from './TableListView';
import Field from './Field.js';

class EditorView extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    record: PropTypes.object,
    mode: PropTypes.string,
  };

  static defaultProps = {
    onClose: () => {},
    record: {},
    mode: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      buttonLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { record } = this.props;
    this.setFormData(record);
  }

  setFormData(data) {
    const transformZero = (value) => {
      if (value === 0) {
        // 这里只是用于展示， 可以直接返回字符串0
        return 0;
      }
      return value || '-';
    };
    const { form = { setFieldsValue: (options) => { 
      this.setState({initialValues: options,})
      }} } = this;
    form.setFieldsValue({
      
    });
  }

  /**
   * 获取表单数据
   */
  getFormData() {
    let obj = {};
    let isValid = true;
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        isValid = false;
        return false;
      }
      obj = values;
      return true;
    });
    return {
      values: obj,
      isValid,
    };
  }

  add = (params) => {
    add(params).then((res) => {
      if (res && res.code === 0) {
        message.success('新增成功，正在更新列表，请稍后...');
        this.finishEdit(true);
      } else {
        message.error('新增失败，请重试');
        this.finishEdit(false);
      }
    });
  }

  edit = (params) => {
    add(params).then((res) => {
      if (res && res.code === 0) {
        message.success('更新成功，正在更新列表，请稍后...');
        this.finishEdit(true);
      } else {
        message.error('更新失败，请重试');
        this.finishEdit(false);
      }
    });
  }

  handleSubmit() {
    const { isValid, values } = this.getFormData();
    const { mode, record } = this.props;
    if (isValid) {
      this.setState({
        buttonLoading: true,
      });
      if (mode === Mode.Add) {
        this.add(values);
      }
      if (mode === Mode.Edit) {
        values.id = record.id;
        this.edit(values);
      }
    }
  }

  finishEdit(refresh) {
    const { onClose } = this.props;
    this.setState(
      {
        buttonLoading: false,
      },
      () => {
        if (typeof onClose === 'function') {
          onClose(refresh);
        }
      }
    );
  }

  /**
   * 生成弹窗底部按钮
   * @returns {*[]}
   * @private
   */
  genFooter() {
    // 是否有更新权限
    const { state } = this;
    const { onClose } = this.props;
    const footer = [
      <Button
        key="back"
        onClick={() => {
          if (typeof onClose === 'function') {
            onClose();
          }
        }}
      >
        取消
      </Button>,
      <Button
        key="sure"
        loading={state.buttonLoading}
        type="primary"
        onClick={this.handleSubmit}
      >
        确定
      </Button>,
    ];
    return footer;
  }

  render() {
    const { form, mode, onClose } = this.props;
    const title = mode === 'edit' ? '编辑' : '新增';
    return (
      <Modal
        visible
        maskClosable={false}
        confirmLoading={false}
        title={title}
        footer={this.genFooter()}
        onCancel={() => {
          if (typeof onClose === 'function') {
            onClose(false);
          }
        }}
      >
        <Form initialValues={this.state.initialValues} onSubmit={this.handleSubmit}>
        </Form>
      </Modal>
    );
  }
}
export default EditorView;
