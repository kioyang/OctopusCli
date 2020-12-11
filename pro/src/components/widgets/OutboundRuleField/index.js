
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

class StoreHouseField extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
    this.selectRef = React.createRef();
  }

  
  state = {
    data: [
        {id:1, sname: '根据货龄降序'},
        {id:2,sname: '按生产日期降序'},
        {id:3,sname: '按质保日期降序'}
    ],
    value: [],
    fetching: false,
  };

  componentDidMount() {
    //   this.fetchUser('3');
  }

  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('/portal/rs/component?event=config&label=cscmStorageMethod')
      .then(response => response.json())
      .then(body => {
        this.setState({ data: body.content && body.content.list, fetching: false });
      });
  };

  handleChange = (labelValue) => {
      const { onChange } = this.props;
      const { data } = this.state;
      let result = {}
      for(let i = 0; i < data.length; i++) {
        const item = data[i];
        if(item.batchno === labelValue.value) {
          result = item;
        }
      }
      onChange(result);
    this.setState({
      value:labelValue,
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
      ref={this.selectRef}
        // mode="multiple"
        // showSearch
        labelInValue
        value={value}
        placeholder="请选择出库规则"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{width: '100%'}}
        // dropdownStyle={{ width: 400}}
        // dropdownClassName="dropdown-long"
      >
        {data.map(d => (
            <Option value={d.id}>{d.sname}</Option>
        ))}
      </Select>
    );
  }
}
export default StoreHouseField;