/**
* 定义组件列表界面。
* @author -@haopengit.com
* @date 2020-12-10 11:53
*/
import React from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import {

  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import { deleteItem } from '@/services/GoodsStock/index';
import EditorView from './EditorView';
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

@connect(({ goodsStock, loading }) => {
  return {
    list: goodsStock.list,
    pagination: goodsStock.pagination,
     density:global.density || 8,
    loading: loading.effects['goodsStock/fetch'] || false,
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
    };
    // 事件处理器绑定上下文
    this.genOperations = this.genOperations.bind(this);
    this.handleMode = this.handleMode.bind(this);
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
      // 商品编码
      align:'center',
      title: '商品编码',
      dataIndex: 'commodityNo',
      key: 'commodityNo',
      sorter: (a, b) => { return a.commodityNo - b.commodityNo;},
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
      // 商品代码
      align:'center',
      title: '商品代码',
      dataIndex: 'commoditycode',
      key: 'commoditycode',
      sorter: (a, b) => { return a.commoditycode - b.commoditycode;},
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
      // 商品名称
      align:'center',
      title: '商品名称',
      dataIndex: 'commodityName',
      key: 'commodityName',
      sorter: (a, b) => { return a.commodityName - b.commodityName;},
      width: 250,
      
      render: (value) => {
        return (
          <Ellipsis title={transformZero(value)}>
                {transformZero(value)}
              </Ellipsis>
        );
      },
    }, 
    {
      // 计量单位
      align:'center',
      title: '计量单位',
      dataIndex: 'minMeasureUnitName',
      key: 'minMeasureUnitName',
      sorter: (a, b) => { return a.minMeasureUnitName - b.minMeasureUnitName;},
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
      // 总库存
      align:'center',
      title: '总库存',
      dataIndex: 'qty',
      key: 'qty',
      sorter: (a, b) => { return a.qty - b.qty;},
      width: 90,
      
      render: (value) => {
        return (
          <Ellipsis title={transformZero(value)}>
                {transformZero(value)}
              </Ellipsis>
        );
      },
    }, 
    {
      // 可用库存
      align:'center',
      title: '可用库存',
      dataIndex: 'availablestockqty',
      key: 'availablestockqty',
      sorter: (a, b) => { return a.availablestockqty - b.availablestockqty;},
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
      // 锁库数量
      align:'center',
      title: '锁库数量',
      dataIndex: 'lockqty',
      key: 'lockqty',
      sorter: (a, b) => { return a.lockqty - b.lockqty;},
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
      title: `操作`,
      dataIndex: `operation`,
      key: `operation`,
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
      type: 'goodsStock/fetch',
      payload: query,
    });
  }

  // 删除项目
  delete = (id) => {
    const { pagination } = this.props;
    message.loading('删除中');
    deleteItem({ ids:id }).then((response) => {
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
      type: 'goodsStock/clear',
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
    const style = { fontWeight: 'bold'};
    return (
      <>
  <AuthorizedButton
          title='编辑'
          permissions={[1]}
          permissionKey={record.billstatus}
          onClick={() => {
            this.props.history.push(`/&#x2F;portal&#x2F;rs&#x2F;stock&#x2F;page/goodsStock/${record.id}`);
          }}
        />
        <AuthorizedDetailButton
          title='详情'
          permissions={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          permissionKey={record.billstatus}
          onClick={() => {
            this.props.history.push(`/&#x2F;portal&#x2F;rs&#x2F;stock&#x2F;page/goodsStock/detail/${record.id}`);
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
    const tableStyle = {height:containerHeight - style.gap};
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
              this.props.history.push('/&#x2F;portal&#x2F;rs&#x2F;stock&#x2F;page/goodsStock/add')
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
          style={tableStyle}
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
