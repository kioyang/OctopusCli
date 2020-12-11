/**
* 定义组件列表界面。
* @author -@haopengit.com
* @date 2020-11-30 17:27
*/
import React from 'react';
import { Table, Button, Popconfirm, message, Modal, Card, Tabs } from 'antd';
import {
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { connect } from 'dva';
import styles from './TableListView.less';
import Ellipsis from '@/components/Ellipsis';
import BillStatus from '@/components/BillStatus';
import AuthorizedButton from '@/components/AuthorizedButton';
import AuthorizedDelete from '@/components/AuthorizedDelete';
import { genTableHeight } from '@/utils/utils';
import ModalHoc from '@/components/Enhancers/ModalHoc.tsx';
import InMaterial from '@/pages/InMaterial';

const { TabPane } = Tabs;

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

@connect(({ stockInAppointmentDetail, loading, global }) => {
  return {
    list: stockInAppointmentDetail.detailList,
    density: global.density,
    pagination: stockInAppointmentDetail.pagination,
    loading: loading.effects['stockInAppointmentDetail/fetch'] || false,
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
      batchVisible: false,
      materialVisible: false,
      eList: []
    };
    // 事件处理器绑定上下文
    this.genOperations = this.genOperations.bind(this);
    this.handleMode = this.handleMode.bind(this);
  }

  // componentWillMount() {
  //   this.getList({
  //     current: 1,
  //     pageSize,
  //   });
  // }

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
        width: 180,
      },
      {
        // 商品代码
        align: 'center',
        title: '商品代码',
        dataIndex: 'commoditycode',
        key: 'commoditycode',
        width: 180,
        editable: false,
        editType: 'scodeselect',
      },
      {
        // 商品名称
        align: 'center',
        title: '商品名称',
        dataIndex: 'commodityname',
        key: 'commodityname',
        width: 250,
        editable: false,
        editType: 'snameselect',
      },
      {
        // 商品规格
        align: 'center',
        title: '商品规格',
        dataIndex: 'model',
        key: 'model',
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
        width: 120,
        editable: false,
      },
      {
        // 预约小包数
        align: 'center',
        title: '预约小包数',
        dataIndex: 'qty',
        key: 'qty',
        sorter: (a, b) => { return a.qty - b.qty; },
        width: 150,
        editable: false,
      },
      {
        // 箱数单位
        align: 'center',
        title: '箱数单位',
        dataIndex: 'packingmeasurementunitname',
        key: 'packingmeasurementunitname',
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
        width: 210,
        editable: false,
      },
      {
        // 件净重(kg) 
        align: 'center',
        title: '件净重(kg) ',
        dataIndex: 'piecenetweight',
        key: 'piecenetweight',
        width: 240,
        editable: false,
      },
      {
        // 保质期（天) 
        align: 'center',
        title: '保质期（天) ',
        dataIndex: 'shelflife',
        key: 'shelflife',
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
        width: 160,
        editable: false,
        editType: 'production'
      },
      {
        // 质保日期
        align: 'center',
        title: '质保日期',
        dataIndex: 'expirationdate',
        key: 'expirationdate',
        width: 160,
        editable: false,
        editType: 'expiration'
      },
      // {
      //   title: `操作`,
      //   dataIndex: `operation`,
      //   key: `operation`,
      //   fixed: `right`,
      //   width: 60,
      //   render: this.genOperations,
      // }
    ];
    return result;
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  getList(query) {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockInAppointmentDetail/fetch',
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
      type: 'stockInAppointmentEdit/clear',
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
            style={{ marginBottom: 10 }}
            onClick={() => {
              this.props.history.push('/stockin/stockInAppointment')
            }}
          >返回</Button>
          <br />
        </div> 
        <Tabs defaultActiveKey="1">
          <TabPane key='1' tab="预约入库">
            <Table
              bordered
              loading={loading}
              className={styles.tableContainer}
              style={{ height: containerHeight - style.gap }}
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
