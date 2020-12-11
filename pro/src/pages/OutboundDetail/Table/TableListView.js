/**
* 定义组件列表界面。
* @author -@haopengit.com
* @date 2020-11-30 17:27
*/
import React from 'react';
import { Table, Button, Tabs } from 'antd';
import {
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { connect } from 'dva';
import styles from './TableListView.less';
import Ellipsis from '@/components/Ellipsis';
import AuthorizedDelete from '@/components/AuthorizedDelete';
import { genTableHeight } from '@/utils/utils';
import { pageSize as defaultPageSize } from '@/config/page'
import BillStatus from '@/components/BillStatus'

const { TabPane } = Tabs;

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

@connect(({ outboundDetail, loading, global }) => {
  return {
    list: outboundDetail.detailList,
    density: global.density,
    pagination: outboundDetail.pagination,
    loading: loading.effects['outboundDetail/fetch'] || false,
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
    };
    // 事件处理器绑定上下文
    this.genOperations = this.genOperations.bind(this);
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
      dataIndex: 'commodityscode',
      key: 'commodityscode',
      sorter: (a, b) => { return a.commodityscode - b.commodityscode;},
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
      dataIndex: 'commodityname',
      key: 'commodityname',
      sorter: (a, b) => { return a.commodityname - b.commodityname;},
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
      // 出库箱数
      align:'center',
      title: '出库箱数',
      dataIndex: 'packingmeasurement',
      key: 'packingmeasurement',
      sorter: (a, b) => { return a.packingmeasurement - b.packingmeasurement;},
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
      // 出库小包数
      align:'center',
      title: '出库小包数',
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
      // 客户批次号
      align:'center',
      title: '客户批次号',
      dataIndex: 'custbatchno',
      key: 'custbatchno',
      sorter: (a, b) => { return a.custbatchno - b.custbatchno;},
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
      // 商品规格
      align:'center',
      title: '商品规格',
      dataIndex: 'model',
      key: 'model',
      sorter: (a, b) => { return a.model - b.model;},
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
      // 品质类型
      align:'center',
      title: '品质类型',
      dataIndex: 'qctypename',
      key: 'qctypename',
      sorter: (a, b) => { return a.qctypename - b.qctypename;},
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
      // 原产国
      align:'center',
      title: '原产国',
      dataIndex: 'origincountry',
      key: 'origincountry',
      sorter: (a, b) => { return a.origincountry - b.origincountry;},
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
      // 仓库名称
      align:'center',
      title: '仓库名称',
      dataIndex: 'warehousename',
      key: 'warehousename',
      sorter: (a, b) => { return a.warehousename - b.warehousename;},
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
      // 箱数单位
      align:'center',
      title: '箱数单位',
      dataIndex: 'packingmeasurementunitname',
      key: 'packingmeasurementunitname',
      sorter: (a, b) => { return a.packingmeasurementunitname - b.packingmeasurementunitname;},
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
      align:'center',
      title: '小包数单位',
      dataIndex: 'cargomeasurermentunitname',
      key: 'cargomeasurermentunitname',
      sorter: (a, b) => { return a.cargomeasurermentunitname - b.cargomeasurermentunitname;},
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
      align:'center',
      title: '毛重(kg) ',
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
      // 净重(kg)
      align:'center',
      title: '净重(kg)',
      dataIndex: 'netweight',
      key: 'netweight',
      sorter: (a, b) => { return a.netweight - b.netweight;},
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
      // 单价
      align:'center',
      title: '单价',
      dataIndex: 'unitprice',
      key: 'unitprice',
      sorter: (a, b) => { return a.unitprice - b.unitprice;},
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
      // 总价
      align:'center',
      title: '总价',
      dataIndex: 'totalmoney',
      key: 'totalmoney',
      sorter: (a, b) => { return a.totalmoney - b.totalmoney;},
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
      align:'center',
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      sorter: (a, b) => { return a.remarks - b.remarks;},
      width: 200,
      
      render: (value) => {
        return (
          <Ellipsis title={transformZero(value)}>
                {transformZero(value)}
              </Ellipsis>
        );
      },
    }, 
    ];
    return result;
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  getList(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'outboundDetail/fetch',
      payload: query,
    });
  }

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
      type: 'outbound/clear',
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
          permissions={[1, 3, 5]}
          permissionKey={record.billstatus}
          onClick={() => {
            this.delete(record.id);
          }}
        />
      </>
    );
  }

  // 生成分页配置
  genPagination(total = 0) {
    const { pagination, list=[] } = this.props;
    return {
      total: list.length,
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
    const { list = [], pagination = {}, loading, containerHeight, density } = this.props;
    const style = genTableHeight(this.btnGroup, containerHeight, density);
    const scroll = { x: xWidth, y: style.scrollHeight - 20 };
    const { total = 0 } = pagination;
    const tableStyle = {height: containerHeight - style.gap};
    const { selectedRowKeys, showMode } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className={styles.tableView}>
        <div className={styles.fixedTopLeft}>
          <Button
            type="primary"
            className={styles.btn}
            style={ {marginBottom: 10} }
            onClick={() => {
              this.props.history.push('/stockout/outbound')
            }}
          >返回</Button>
          <br />
        </div> 
        <Tabs defaultActiveKey="1">
          <TabPane key='1' tab="tab1">
            <Table
              bordered
              loading={loading}
              className={styles.tableContainer}
              style={tableStyle}
              size="small"
              dataSource={list}
              // rowSelection={rowSelection}
              columns={this.columns}
              pagination={this.genPagination(total)}
              rowKey={record => {
                return record.id;
              }}
              context={this.props.context}
              scroll={scroll}
              onChange={this.handleTableChange}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default TableListView;
