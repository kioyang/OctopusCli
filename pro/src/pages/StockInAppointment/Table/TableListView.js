/**
* 定义组件列表界面。
* @author -@haopengit.com
* @date 2020-11-30 17:12
*/
import React from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import {

  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import { deleteItem } from '@/services/StockInAppointment/index';
import styles from './TableListView.less';
import Ellipsis from '@/components/Ellipsis'
import BillStatus from '@/components/BillStatus';
import AuthorizedButton from '@/components/AuthorizedButton';
import AuthorizedDelete from '@/components/AuthorizedDelete';
import AuthorizedDetailButton from '@/components/AuthorizedDetailButton'
import { genTableHeight } from '@/utils/utils'
import { Link } from 'umi';
import { pageSize as defaultPageSize } from '@/config/page'

let pageSize = defaultPageSize;
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

@connect(({ stockInAppointment, loading,global }) => {
  return {
    list: stockInAppointment.list,
    density:global.density || 8,
    pagination: stockInAppointment.pagination,
    loading: loading.effects['stockInAppointment/fetch'] || false,
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
      showMode: '',
      selectedRowKeys: [],
      tableHeight: 0,
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
        // 单据编号
        align: 'center',
        title: '单据编号',
        dataIndex: 'snumber',
        key: 'snumber',
        width: 180,

        render: (value) => {
          return (
            <Ellipsis title={transformZero(value)}>
              <span style={{ fontWeight: 'bold' }}>{transformZero(value)}</span>
            </Ellipsis>
          );
        },
      },
      {
        // 库点名称
        align: 'center',
        title: '库点名称',
        dataIndex: 'storehousename',
        key: 'storehousename',
        sorter: (a, b) => { return a.storehousename - b.storehousename; },
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
        // 入库预约时间
        align: 'center',
        title: '入库预约时间',
        dataIndex: 'planoperationtime',
        key: 'planoperationtime',
        sorter: (a, b) => { return a.planoperationtime - b.planoperationtime; },
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
        // 预约箱数
        align: 'center',
        title: '预约箱数',
        dataIndex: 'packingmeasurement',
        key: 'packingmeasurement',
        sorter: (a, b) => { return a.packingmeasurement - b.packingmeasurement; },
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
        // 预约小包数
        align: 'center',
        title: '预约小包数',
        dataIndex: 'cargomeasurerment',
        key: 'cargomeasurerment',
        sorter: (a, b) => { return a.cargomeasurerment - b.cargomeasurerment; },
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
        // 毛重(kg)
        align: 'center',
        title: '毛重(kg)',
        dataIndex: 'grossweight',
        key: 'grossweight',
        sorter: (a, b) => { return a.grossweight - b.grossweight; },
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
        // 净重(kg)
        align: 'center',
        title: '净重(kg)',
        dataIndex: 'netweight',
        key: 'netweight',
        sorter: (a, b) => { return a.netweight - b.netweight; },
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
        // 货值
        align: 'center',
        title: '货值',
        dataIndex: 'cargovalue',
        key: 'cargovalue',
        sorter: (a, b) => { return a.cargovalue - b.cargovalue; },
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
        // 备注
        align: 'center',
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        sorter: (a, b) => { return a.remarks - b.remarks; },
        width: 200,

        render: (value) => {
          return (
            <Ellipsis title={transformZero(value)}>
              {transformZero(value)}
            </Ellipsis>
          );
        },
      },
      {
        // 单据状态
        align: 'center',
        title: '单据状态',
        dataIndex: 'billstatus',
        key: 'billstatus',
        fixed: 'right',
        sorter: (a, b) => { return a.billstatus - b.billstatus; },
        width: 120,

        render: (value) => {
          return (
            <BillStatus status={value} />
          );
        },
      },
      {
        title: `操作`,
        dataIndex: `operation`,
        key: `operation`,
        align: 'center',
        fixed: `right`,
        width: 168,
        render: this.genOperations,
      }];
    return result;
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  getList(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointment/fetch',
      payload: query,
    });
  }

  // 删除项目
  delete = (id) => {
    const { pagination } = this.props;
    message.loading('删除中');
    deleteItem({ ids: id }).then((response) => {
      const res = response;
      message.destroy();
      if (res && res.success) {
        message.success('删除成功，正在更新列表，请稍后...');
        this.getList({
          current: pagination.current,
          pageSize,
        });
      } else {
        message.error(res.msg || '删除失败，请重试');
      }
    })
      .catch(() => {
        message.destroy();
        message.error('未知异常');
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
      type: 'stockInAppointment/clear',
    });
  }

  // 四 block: 处理器
  /**
   * 详情弹窗
   * @param record
   */
  handleMode({ showMode, record }) {
    this.record = record;
    this.setState({
      showMode,
    });
  }

  // 生成操作栏按钮
  genOperations(text, record) {
    const style = { fontWeight: 'bold' };
    return (
      <>
        <AuthorizedButton
          title='编辑'
          permissions={[1]}
          permissionKey={record.billstatus}
          onClick={() => {
            this.props.history.push(`/stockin/stockInAppointment/${record.id}`);
          }}
        />
        <AuthorizedDetailButton
          title='详情'
          permissions={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          permissionKey={record.billstatus}
          onClick={() => {
            this.props.history.push(`/stockin/stockInAppointment/detail/${record.id}`);
          }}
        />
        <AuthorizedDelete
          title='删除'
          record={record}
          permissions={[1]}
          permissionKey={record.billstatus}
          onClick={() => {
            this.delete(record.id);
          }}
        />
      </>
    );
  }

  // 生成分页配置
  genPagination(total) {
    const { pagination } = this.props;
    return {
      total,
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
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    this.setState({ selectedRowKeys });
  }

  render() {
    const xWidth = this.columns.reduce((tol, item) => tol + item.width || 300, 0);
    const { selectedRowKeys, showMode } = this.state;
    const { containerHeight,density } = this.props;
    const style = genTableHeight(this.btnGroup, containerHeight,density);
    const scroll = { x: xWidth, y: style.scrollHeight };
    const { list = [], pagination = {}, loading } = this.props;
    const { total = 0 } = pagination;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles.tableView} ref={(el) => { this.parent = el; }}>
        <div className={styles.btnGroup} ref={(el) => { this.btnGroup = el; }}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            className={styles.add}
            onClick={() => {
              this.props.history.push('/stockin/stockInAppointment/add')
            }}
          >
            新增
          </Button>
          <ButtonGroup className={styles.rightBtn} onChange={this.handleBatchOperation}>
            <Button
              value="reload"
              icon={<ReloadOutlined />}
              onClick={() => {
                this.getList({
                  current: 1,
                  pageSize,
                });
              }}
            >刷新
            </Button>
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
                      this.delete(selectedRowKeys.join(','));
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
        <Table
          bordered
          loading={loading}
          size="small"
          className={styles.tableContainer}
          rowClassName="normal-row"
          style={{height:containerHeight - style.gap}}
          dataSource={list}
          rowSelection={rowSelection}
          columns={this.columns}
          pagination={this.genPagination(total)}
          rowKey={record => {
            return record.id;
          }}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
          scroll={scroll}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default TableListView;
