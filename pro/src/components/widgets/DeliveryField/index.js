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
    data: [],
    value: [],
    fetching: false,
  };

  componentDidMount() {
      this.fetchUser('3');
  }

  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('/portal/queryDataBase.do?event=queryDataBaseViewPageList&page=1&limit=10&queryColumn=deliverydot&type=0&whereColumnName=sname&billType=trsoutboundappointment&custid=Q1UWFU_7e3b9dcfde7b4bd1ad1740fe2c241a7b')
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
        if(item.id === labelValue) {
          result = labelValue;
        }
      }
      onChange(result);
    this.setState({
      value:labelValue,
      fetching: false,
    });
  };

  render() {
    const { fetching, data } = this.state;
    const { disabled,value } = this.props;
    return (
      <Select
      disabled={disabled}
      ref={this.selectRef}
        // mode="multiple"
        // showSearch
        value={value}
        placeholder="请选择配送点"
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