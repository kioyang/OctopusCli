/**
* 定义组件列表界面。
* @author -@haopengit.com
* @date 2020-11-30 17:27
*/
import React from 'react';
import { Table, Button, Popconfirm, message, Modal, Card } from 'antd';
import {
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { connect } from 'dva';
import { deleteItem } from '@/services/StockInAppointmentEdit/index';
import styles from './TableListView.less';
import Ellipsis from '@/components/Ellipsis';
import BillStatus from '@/components/BillStatus';
import AuthorizedButton from '@/components/AuthorizedButton';
import AuthorizedDelete from '@/components/AuthorizedDelete';
import { genTableHeight } from '@/utils/utils';
import EditableTable from '../Editables';
import ModalHoc from '@/components/Enhancers/ModalHoc.tsx';
import InMaterial from '@/pages/InMaterial';

import { GlobalDensity } from '@/config/style'

let pageSize = 20;

export const Mode = {
  Default: '',
  Add: 'add',
  Edit: 'edit',
};

const transformZero = (value) => {
  if (value === 0) {
    // 这里只是用于展示， 可以直接返回字符串0
    return 0;
  }
  return value || '';
};
const ButtonGroup = Button.Group;

@connect(({ stockInAppointmentEdit, loading,global }) => {
  return {
    list: stockInAppointmentEdit.list,
    buttonLoading: loading.effects['stockInAppointmentEdit/saveObject'] || false,
    editList: stockInAppointmentEdit.editList,
    density: global.density || GlobalDensity.normal,
    pagination: stockInAppointmentEdit.pagination,
    loading: loading.effects['stockInAppointmentEdit/fetch'] || false,
  };
})
class TableListView extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  // 初始化默认状态, 事件处理器绑定上下文
  constructor(props) {
    super(props);
    // 初始化状态
    this.state = {
      selectedRowKeys: [],
      addedRows: [] // 选择的商品
    };
    // 事件处理器绑定上下文
    this.genOperations = this.genOperations.bind(this);
  }

  componentWillMount() {
    this.getList({
      current: 1,
      pageSize,
    });
  }

  componentWillUnmount() {
    this.clear();
  }

  get columns() {
    const result = [
      {
        // 商品批号
        align: 'center',
        title: '商品批号',
        dataIndex: 'batchno',
        key: 'batchno',
        sorter: (a, b) => { return a.batchno - b.batchno; },
        width: 180,
      },
      {
        // 商品代码
        align: 'center',
        title: '商品代码',
        dataIndex: 'commoditycode',
        key: 'commoditycode',
        sorter: (a, b) => { return a.commoditycode - b.commoditycode; },
        width: 180,
        editable: true,
        editType: 'scodeselect',
      },
      {
        // 商品名称
        align: 'center',
        title: '商品名称',
        dataIndex: 'commodityname',
        key: 'commodityname',
        sorter: (a, b) => { return a.commodityname - b.commodityname; },
        width: 300,
        editable: true,
        editType: 'snameselect',
      },
      {
        // 商品规格
        align: 'center',
        title: '商品规格',
        dataIndex: 'model',
        key: 'model',
        sorter: (a, b) => { return a.model - b.model; },
        width: 120,

        render: (value) => {
          return (
            <Ellipsis title={transformZero(value)}>
              {transformZero(value)}
            </Ellipsis>
          );
        },
      },
      {
        // 预约箱数
        align: 'center',
        title: '预约箱数',
        dataIndex: 'packingmeasurement',
        key: 'packingmeasurement',
        sorter: (a, b) => { return a.packingmeasurement - b.packingmeasurement; },
        width: 120,
        editable: true,
      },
      {
        // 预约小包数
        align: 'center',
        title: '预约小包数',
        dataIndex: 'qty',
        key: 'qty',
        sorter: (a, b) => { return a.qty - b.qty; },
        width: 150,
        editable: true,
      },
      {
        // 箱数单位
        align: 'center',
        title: '箱数单位',
        dataIndex: 'packingmeasurementunitname',
        key: 'packingmeasurementunitname',
        sorter: (a, b) => { return a.packingmeasurementunitname - b.packingmeasurementunitname; },
        width: 120,

        render: (value) => {
          return (
            <Ellipsis title={transformZero(value)}>
              {transformZero(value)}
            </Ellipsis>
          );
        },
      },
      {
        // 小包数单位
        align: 'center',
        title: '小包数单位',
        dataIndex: 'cargomeasurermentunitname',
        key: 'cargomeasurermentunitname',
        sorter: (a, b) => { return a.cargomeasurermentunitname - b.cargomeasurermentunitname; },
        width: 150,

        render: (value) => {
          return (
            <Ellipsis title={transformZero(value)}>
              {transformZero(value)}
            </Ellipsis>
          );
        },
      },
      {
        // 件毛重(kg)
        align: 'center',
        title: '件毛重(kg)',
        dataIndex: 'piecegrossweight',
        key: 'piecegrossweight',
        sorter: (a, b) => { return a.piecegrossweight - b.piecegrossweight; },
        width: 210,
        editable: true,
      },
      {
        // 件净重(kg) 
        align: 'center',
        title: '件净重(kg) ',
        dataIndex: 'piecenetweight',
        key: 'piecenetweight',
        sorter: (a, b) => { return a.piecenetweight - b.piecenetweight; },
        width: 240,
        editable: true,
      },
      {
        // 保质期（天) 
        align: 'center',
        title: '保质期（天) ',
        dataIndex: 'shelflife',
        key: 'shelflife',
        sorter: (a, b) => { return a.shelflife - b.shelflife; },
        width: 210,

        render: (value) => {
          return (
            <Ellipsis title={transformZero(value)}>
              {transformZero(value)}
            </Ellipsis>
          );
        },
      },
      {
        // 单价(元) 
        align: 'center',
        title: '单价(元) ',
        dataIndex: 'unitprice',
        key: 'unitprice',
        sorter: (a, b) => { return a.unitprice - b.unitprice; },
        width: 180,
        render: (value) => {
          return (
            <Ellipsis title={transformZero(value)}>
              {transformZero(value)}
            </Ellipsis>
          );
        },
      },
      {
        // 生产日期
        align: 'center',
        title: '生产日期',
        dataIndex: 'productiondate',
        key: 'productiondate',
        sorter: (a, b) => { return a.productiondate - b.productiondate; },
        width: 160,
        editable: true,
        editType: 'production'
      },
      {
        // 质保日期
        align: 'center',
        title: '质保日期',
        dataIndex: 'expirationdate',
        key: 'expirationdate',
        sorter: (a, b) => { return a.expirationdate - b.expirationdate; },
        width: 160,
        editable: true,
        editType: 'expiration'
      },
      {
        title: `操作`,
        align:'center',
        dataIndex: `operation`,
        key: `operation`,
        fixed: `right`,
        width: 60,
        render: this.genOperations,
      }];
    return result;
  }

  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({ selectedRowKeys,selectedRows});
  };

  getList(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointmentDetail/fetch',
      payload: query,
    });
  }

  // 删除项目
  delete = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointmentEdit/deleteRow',
      payload: {
        row:record,
      }
    })
  };

  // 筛选条件
  handleTableChange = (pagination, filters, sorter) => {
    pageSize = pagination.pageSize;
    const keys = Object.keys(filters);
    const params = {
      current: pagination.current,
      pageSize,
    };
    keys.forEach((item) => {
      if (filters[item] && filters[item].length) {
        params[item] = JSON.stringify(filters[item]);
      }
    });
    if (sorter.field) {
      params[sorter.field] = sorter.order === 'ascend' ? 'asc' : 'desc';
    }
    this.getList(params);
  };

  clear() {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointmentEdit/clear',
    });
  }

  // 生成操作栏按钮
  genOperations(text, record) {
    const style = { fontWeight: 'bold' };
    return (
      <>
        <AuthorizedDelete
          title='删除'
          record={record}
          permissions={[1, 3, 5,undefined]}
          permissionKey={record.billstatus}
          onClick={() => {
            this.delete(record);
          }}
        />
      </>
    );
  }

  // 生成分页配置
  genPagination(total = 0) {
    const { pagination, editList } = this.props;
    return {
      total: editList.length,
      pageSize,
      current: pagination.current,
      onChange: page => {
        this.getList({
          current: page,
          pageSize,
        });
      },
    };
  }

  handleBatchOperation() {
    return this;
  }

  // 处理编辑明细
  handleEditList = (arr = []) => {
    this.setState({
      addedRows: arr,
    })
  }

  handleAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointmentEdit/addRow',
      payload: {
        row:{}
      }
    })
  }
  selectRow = (record) => {
    const { selectedRows = [] } = this.state;
    const { valueCallback } = this.props;
    const allRows = [...selectedRows,record];
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.onlyid), 1);
    } else {
      selectedRowKeys.push(record.onlyid);
    }
    this.setState({ selectedRowKeys,selectedRows: allRows });
  }

  render() {
    const xWidth = this.columns.reduce((tol, item) => tol + item.width || 300, 0);
    const { selectedRowKeys, showMode } = this.state;
    const { containerHeight, collapse,density } = this.props;
    const style = genTableHeight(this.btnGroup, containerHeight,density);
    const scroll = { x: xWidth, y: style.scrollHeight };
    const { pagination = {}, loading,editList = [] } = this.props;
    const { total = 0 } = pagination;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles.tableView} ref={(el) => {
        this.tableView = el;
      }}>
        <div className={styles.fixedTopLeft}>
          <Button
            type="primary"
            className={styles.btn}
            style={{ marginBottom: 10 }}
            onClick={() => {
              this.props.history.push('/stockin/stockInAppointment')
            }}
          >返回</Button>
          <br />
        </div>
        <div
          className={styles.fixedBottomLeft}
        >
          <Button
            type="primary"
            loading={this.props.buttonLoading}
            className={styles.btn}
            style={{ marginBottom: 10 }}
            onClick={() => {
              const { context } = this.props;
              context.save('submit')
                .then((res) => {
                  if (res.success) {
                    this.props.history.push('/stockin/stockInAppointment')
                  } else {
                    message.warning(res.msg || '后台未知异常');
                  }
                })
            }}
          >提交</Button>
          <br />
          <Button
            loading={this.props.buttonLoading}
            type="primary"
            className={styles.btn}
            style={{ marginBottom: 10 }}
            onClick={() => {
              const { context } = this.props;
              context.save('save')
                .then((res) => {
                  if (res.success) {
                    this.props.history.push('/stockin/stockInAppointment')
                  } else {
                    message.warning(res.msg || '后台未知异常');
                  }
                })
            }}
          >保存</Button>
        </div>
        <div className={styles.btnGroup} ref={(el) => { this.btnGroup = el; }}>
          <Button
            onClick={this.handleAdd}
            type="primary"
            style={{ marginRight: 10 }}
          >
            增行
        </Button>
          <ModalHoc
            content={<InMaterial valueCallback={this.handleEditList} />}
            onOk={() => {
              const { dispatch } = this.props;
              const { addedRows } = this.state;
              dispatch({
                type: 'stockInAppointmentEdit/addRows',
                payload: {
                  addedRows: addedRows || [],
                }
              });
            }}
          >
            <Button
              icon={<PlusOutlined />}
              type="primary"
              className={styles.add}
            >
              选择商品
          </Button>
          </ModalHoc>
          <ButtonGroup className={styles.rightBtn} onChange={this.handleBatchOperation}>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                if (selectedRowKeys.length) {
                  Modal.confirm({
                    title: '确认',
                    okText:'确定',
                    cancelText: '取消',
                    content: `您确认删除选中的数据吗`,
                    onOk: () => {
                      const { selectedRows } = this.state;
                      selectedRows && selectedRows.forEach((item) => {
                        this.delete(item);
                      })
                    },
                  });
                  return;
                }
                message.info('请先选择一项!');
              }}
            >批量删除
            </Button>
          </ButtonGroup>
        </div>
        <EditableTable
          bordered
          loading={loading}
          className={styles.tableContainer}
          style={{height: containerHeight - style.gap}}
          size="small"
          bodyStyle={{height: containerHeight - style.gap}}
          dataSource={editList}
          rowSelection={rowSelection}
          customColumns={this.columns}
          pagination={this.genPagination(total)}
          rowKey={record => {
            return record.onlyid;
          }}
          // onRow={(record) => {
          //   return {
          //     onClick: () => {
          //       this.selectRow(record)
          //     }
          //   }
          // }}
          context={this.props.context}
          scroll={scroll}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default TableListView;
