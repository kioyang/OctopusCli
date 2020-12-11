import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import { connect } from 'umi';
import './index.less'

/**
 * 每个表单域可以切换编辑状态 展示不同的组件状态
 */
import ScodeRemoteSelect from './ScodeRemoteSelect';
import SnameRemoteSelect from './SnameRemoteSelect'
import ProductionTimeField from './ProductionTimeField'
import ExpirationTimeField from './ExpirationTimeField'
import { edit } from '@/services/FindByBatchno';

const EditableContext = React.createContext();

const TypeHandler = {
  scodeselect: function ({ title, dataIndex, inputRef,toggleEdit,save,onChange }) {
    const formItem = (
      <Form.Item
        style={ {margin: 0,} }
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title}必填.`,
          },
        ]}
      >
        <ScodeRemoteSelect
          ref={inputRef}
          onVary={onChange}
          onBlur={toggleEdit}
        />
      </Form.Item>)
      return formItem;
   },
  snameselect: function ({ title, dataIndex, inputRef,toggleEdit,save,onChange }) {
    const formItem = (
      <Form.Item
        style={ {margin: 0} }
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title}必填.`,
          },
        ]}
      >
        <SnameRemoteSelect
          ref={inputRef}
          onVary={onChange}
          onBlur={toggleEdit}
        />
      </Form.Item>)
      return formItem;
   },
  production: function ({ title, dataIndex, inputRef,toggleEdit,save,onChange }) {
    const formItem = (
      <Form.Item
        style={ {margin: 0} }
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title}必填.`,
          },
        ]}
      >
        <ProductionTimeField
          ref={inputRef}
          onVary={onChange}
          onBlur={(event) => {
            toggleEdit();
          }}
        />
      </Form.Item>)
      return formItem;
  },
  expiration: function ({ title, dataIndex, inputRef,toggleEdit,save,onChange }) { 
  const formItem  = (
      <Form.Item
        style={ {margin: 0} }
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title}必填.`,
          },
        ]}
      >
        <ExpirationTimeField
          ref={inputRef}
          onVary={onChange}
          onBlur={(event) => {
            toggleEdit();
          }}
        />
      </Form.Item>);
      return formItem;
  },
  input: function ({ title, dataIndex, inputRef,toggleEdit,save,onChange }) {
    const formItem = <Form.Item
      style={ {margin: 0} }
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `${title}必填.`,
        },
      ]}
    >
      <Input
        ref={inputRef}
        onBlur={(event) => {
          save({ dataIndex: event.target.value })
        }}
        onPressEnter={(event) => {
          save({ dataIndex: event.target.value })
        }}
      />
    </Form.Item>
    return formItem;
  }
}

// 可编辑行
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  const { context = {} } = props;
  context.tableForm = form;
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

// 可编辑列
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  editType = 'input',
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      if (inputRef.current.focus) {
        inputRef.current.focus();
      } else {
        inputRef.current.selectRef.current.focus();
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (result = {}) => {
    try {
      const values = await form.getFieldsValue();
      handleSave({ ...record, ...values, ...result });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  const onChange = (result) => {
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    })
    save(result);
  }

  let childNode = children;
  const formItem = TypeHandler[editType]({ dataIndex, title, inputRef,save,onChange,toggleEdit });

  if (editable) {
    childNode = editing ? formItem : (
      <div
        className="editable-cell-value-wrap"
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [];
  }

  deleteRow = () => {
    const { dispatch, editList = [] } = this.props;
    const newData = {};
    dispatch({
      type: 'goodsStockEdit/deleteRow',
      payload: {
        row:newData,
      }
    })
  };

  addRow = () => {
    const { dispatch, editList = [] } = this.props;
    const newData = {};
    dispatch({
      type: 'goodsStockEdit/addRow',
      payload: {
        row:newData,
      }
    })
  };
  // 修改
  modifyRow = (row = {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'goodsStockEdit/modifyRow',
      payload: {
        row,
      }
    })
  };

  render() {
    const { context } = this.props;
    const components = {
      body: {
        row: (props) => {
          return (
            <EditableRow {...props} context={context} />
          )
        },
        cell: EditableCell,
      },
    };
    const { customColumns = [] } = this.props;
    const columns = customColumns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          editType: col.editType,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.modifyRow,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          columns={columns}
          {...this.props}
          dataSource={this.props.editList}
        />
      </div>
    );
  }
}
export default connect(({ goodsStockEdit }) => {
  return { editList: goodsStockEdit.editList }
})(EditableTable);