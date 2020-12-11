/**
* 定义组件列表界面。
* @author -@haopengit.com
* @date 2020-11-30 18:20
*/
import React from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import {

  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { connect } from 'dva';
import { deleteItem } from '@/services/InMaterial/index';
import EditorView from './EditorView';
import styles from './TableListView.less';
import Ellipsis from '@/components/Ellipsis'
import BillStatus from '@/components/BillStatus';
import AuthorizedButton from '@/components/AuthorizedButton';
import AuthorizedDelete from '@/components/AuthorizedDelete';
import { genTableHeight } from '@/utils/utils'
import { detailMap } from './OOMap'
import { OOMTransfer } from '@/utils/OOM'

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

@connect(({ inMaterial, loading,global }) => {
  return {
    list: inMaterial.list,
    density: global.density,
    pagination: inMaterial.pagination,
    loading: loading.effects['inMaterial/fetch'] || false,
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
      selectedRows: []
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
    const { pagination } = this.props;
    const { pageSize,current } = pagination;
    const result = [
    {
      // 序号
      align:'center',
      title: '序号',
      dataIndex: 'sort',
      key: 'sort',
      sorter: (a, b) => { return a.sort - b.sort;},
      width: 120,
      
      render: (value,record,index) => {
       return index + 1 + pageSize * (current - 1);
      },
    }, 
    {
      // 商品代码
      align:'center',
      title: '商品代码',
      dataIndex: 'scode',
      key: 'scode',
      sorter: (a, b) => { return a.scode - b.scode;},
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
      dataIndex: 'sname',
      key: 'sname',
      sorter: (a, b) => { return a.sname - b.sname;},
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
      // 商品品类
      align:'center',
      title: '商品品类',
      dataIndex: 'materialdicname',
      key: 'materialdicname',
      sorter: (a, b) => { return a.materialdicname - b.materialdicname;},
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
      dataIndex: 'materialmodel',
      key: 'materialmodel',
      sorter: (a, b) => { return a.materialmodel - b.materialmodel;},
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
      // 包装单位
      align:'center',
      title: '包装单位',
      dataIndex: 'maxunitname',
      key: 'maxunitname',
      sorter: (a, b) => { return a.maxunitname - b.maxunitname;},
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
      // 货物单位
      align:'center',
      title: '货物单位',
      dataIndex: 'minunitname',
      key: 'minunitname',
      sorter: (a, b) => { return a.minunitname - b.minunitname;},
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
      // 储存方式
      align:'center',
      title: '储存方式',
      dataIndex: 'savemodename',
      key: 'savemodename',
      sorter: (a, b) => { return a.savemodename - b.savemodename;},
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
      // 件毛重(kg)
      align:'center',
      title: '件毛重(kg)',
      dataIndex: 'grossweight',
      key: 'grossweight',
      sorter: (a, b) => { return a.grossweight - b.grossweight;},
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
      // 件净重(kg) 
      align:'center',
      title: '件净重(kg) ',
      dataIndex: 'netweight',
      key: 'netweight',
      sorter: (a, b) => { return a.netweight - b.netweight;},
      width: 240,
      
      render: (value) => {
        return (
          <Ellipsis title={transformZero(value)}>
                {transformZero(value)}
              </Ellipsis>
        );
      },
    },];
    return result;
  }

  onSelectChange = (selectedRowKeys,selectedRows = []) => {
    this.setState({ selectedRowKeys,selectedRows });
    const { valueCallback } = this.props;
    // 将查询的商品的数据转化
    const rows = selectedRows.map((item) => {
      return OOMTransfer(item,detailMap);
    })
    console.log(rows,'rows');
    const promises = [];
    for(let i = 0 ; i < rows.length;i++) {
      const item = rows[i];
      const promise = new Promise((resolve,reject) => {
        this.getBatchNo(function(batchno) {
          item.batchno = batchno;
          resolve(item);
        })
      });
      promises.push(promise);
    }
    Promise.all(promises)
    .then((res) => {
      valueCallback(res);
    })
  };

  getBatchNo(callback) {
    var batchurl = '/portal/rs/snumber/batchno';
    fetch(batchurl, {
        method: 'POST',
        headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: {}
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var batchno = data.content;
            callback(batchno);
        });
}

  selectRow = (record) => {
    const { selectedRows } = this.state;
    const { valueCallback } = this.props;
    const allRows = [...selectedRows,record];
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
    } else {
      selectedRowKeys.push(record.id);
    }
    const rows = allRows.map((item) => {
      return OOMTransfer(item,detailMap);
    })
    const promises = [];
    for(let i = 0 ; i < rows.length;i++) {
      const item = rows[i];
      const promise = new Promise((resolve,reject) => {
        this.getBatchNo(function(batchno) {
          item.batchno = batchno;
          resolve(item);
        })
      });
      promises.push(promise);
    }
    this.setState({ selectedRowKeys,selectedRows: allRows });
    Promise.all(promises)
    .then((res) => {
      valueCallback(res);
    })
  }

  getList(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'inMaterial/fetch',
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
      type: 'inMaterial/clear',
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
          style={{display: 'none'}}
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
          <ButtonGroup style={{display: 'none'}} className={styles.rightBtn} onChange={this.handleBatchOperation}>
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
            style={{display:'none'}}
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
          size="small"
          dataSource={list}
          rowSelection={rowSelection}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            },
          })}
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
