import React from 'react';
import { message, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import './RemoteSelect.less'
import { OOMTransfer } from '@/utils/OOM'
import { detailMap } from '../Table/OOMap'

const { Option } = Select;

class SnameRemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.selectRef = React.createRef();
    this.fetchList = debounce(this.fetchList, 618);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  componentDidMount() {
    this.fetchList(void 0);
  }

  fetchList = value => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    let url = '/portal/rs/material/page?page=1&limit=1000&keyword=' + value;
    if (!value) {
      url = '/portal/rs/material/page?page=1&limit=1000'
    }
    fetch(url)
      .then(response => response.json())
      .then(body => {
        console.log(body,'body');
        this.setState({ data: body.content && body.content.list, fetching: false });
      });
  };

  transferData = (item, batchno) => {
    const newItem = OOMTransfer(item, detailMap);
    newItem.batchno = batchno;
    return newItem;
  }

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

  handleChange = (value) => {
    const { onChange, onVary } = this.props;
    const { data } = this.state;
    let result = {}
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.id === value) {
        result = item;
      }
    }
    onChange(value);
    const that = this;
    message.loading('获取批号');
    this.getBatchNo(function (batchno) {
      message.destroy();
      onVary(that.transferData(result, batchno))
    })
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
        ref={this.selectRef}
        showSearch
        value={value}
        placeholder="请输入商品代码"
        defaultOpen
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchList}
        onChange={this.handleChange}
        style={ {width: '100%'} }
        dropdownStyle={ {width: 400} }
        dropdownClassName="dropdown-long"
        onBlur={this.props.onBlur}
      >
        {
          data && data.length ?
            <Option disabled>
              <span style={ {width: 100, display: 'inline-block'} }>商品代码</span>
              <span style={ {width: 300, display: 'inline-block'} }>商品名称</span>
              <span>商品规格</span>
            </Option>
            : null
        }
        {data && data.map(d => (
          <Option key={d.batchno} value={d.id}>
            <span style={ {width: 100, display: 'inline-block'} }>{d.scode}</span>
            <span style={ {display: 'inline-block', width: 300} }>{d.sname}</span>
            {d.materialmodel}&nbsp;&nbsp;<span>{d.scode}</span></Option>
        ))}
      </Select>
    );
  }
}
export default SnameRemoteSelect;