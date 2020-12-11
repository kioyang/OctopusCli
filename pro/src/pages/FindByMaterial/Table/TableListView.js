/**
* 定义组件列表界面。
* @author -@haopengit.com
* @date 2020-11-25 19:38
*/
import React from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import {

  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import { deleteItem } from '@/services/FindByMaterial/index';
import EditorView from './EditorView';
import styles from './TableListView.less';
import Ellipsis from '@/components/Ellipsis'
import BillStatus from '@/components/BillStatus';
import AuthorizedButton from '@/components/AuthorizedButton';
import AuthorizedDelete from '@/components/AuthorizedDelete';
import { genTableHeight } from '@/utils/utils'
import { OOMTransfer } from '@/utils/OOM';
import { detailMap } from './OOMap'

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

@connect(({ findByMaterial, loading }) => {
  return {
    list: findByMaterial.list,
    pagination: findByMaterial.pagination,
    loading: loading.effects['findByMaterial/fetch'] || false,
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
      // 商品批号
      align:'center',
      title: '商品批号',
      dataIndex: 'batchno',
      key: 'batchno',
      sorter: (a, b) => { return a.batchno - b.batchno;},
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
      // 商品类别
      align:'center',
      title: '商品类别',
      dataIndex: 'commodityCategoryName',
      key: 'commodityCategoryName',
      sorter: (a, b) => { return a.commodityCategoryName - b.commodityCategoryName;},
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
      // 商品规格
      align:'center',
      title: '商品规格',
      dataIndex: 'commoditySpecification',
      key: 'commoditySpecification',
      sorter: (a, b) => { return a.commoditySpecification - b.commoditySpecification;},
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
      // 预约小包数
      align:'center',
      title: '预约小包数',
      dataIndex: 'qty',
      key: 'qty',
      sorter: (a, b) => { return a.qty - b.qty;},
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
      // 货柜号
      align:'center',
      title: '货柜号',
      dataIndex: 'containerno',
      key: 'containerno',
      sorter: (a, b) => { return a.containerno - b.containerno;},
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
      title: `操作`,
      dataIndex: `operation`,
      key: `operation`,
      fixed: `right`,
      width: 120,
      render: this.genOperations,
    }];
    return result;
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { valueCallback } = this.props;
    const rows = selectedRows.map((item) => {
      return OOMTransfer(item,detailMap);
    })
    valueCallback(rows);
    this.setState({ selectedRowKeys });
  };

  getList(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'findByMaterial/fetch',
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
        message.error('删除失败，请重试');
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
      type: 'findByMaterial/clear',
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
          permissions={[1, 3, 5]}
          permissionKey={+record.billstatus}
        />
              <AuthorizedDelete
          title='删除'
          record={record}
          permissions={[1, 3, 5]}
          permissionKey={+record.billstatus}
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

  render() {
    const xWidth = this.columns.reduce((tol, item) => tol + item.width || 300, 0);
    const { list = [], pagination = {}, loading,containerHeight,density } = this.props;
    const style = genTableHeight(this.btnGroup,containerHeight,density);
    const scroll = { x: xWidth, y: style.scrollHeight };
    const { total = 0 } = pagination;
    const { selectedRowKeys, showMode } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles.tableView}>
        {showMode !== '' ? (
          <EditorView
            mode={showMode}
            record={this.record}
            onClose={isOkEvent => {
              if (isOkEvent) {
                // 如果点了确定按钮 刷新一下表格
                this.getList({
                  current: pagination.current,
                  pageSize,
                });
              }
              // 关闭编辑框
              this.handleMode({
                showMode: '',
                record: { id: 0 },
              });
            }}
          />
        ) : null}
        <div className={styles.btnGroup} ref={(el) => { this.btnGroup = el;}}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            className={styles.add}
            onClick={() => {
              this.handleMode({
                showMode: Mode.Add,
                record: { id: 0 },
              });
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
                if(selectedRowKeys.length) {
                  Modal.confirm({
                    title: '确认',
                    content: `您确认删除id${selectedRowKeys}`,
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
          style={{height: style.scrollHeight}}
          size="small"
          dataSource={list}
          rowSelection={rowSelection}
          columns={this.columns}
          pagination={this.genPagination(total)}
          rowKey={record => {
            return record.id;
          }}
          scroll={scroll}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default TableListView;
