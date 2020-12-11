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
    value: undefined,
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
    fetch('/portal/queryDataBase.do?event=queryDataBaseViewPageList&page=1&limit=1&queryColumn=shippingmethod&type=0')
      .then(response => response.json())
      .then(body => {
        this.setState({ data: body.content && body.content.list, fetching: false });
      });
  };

  handleChange = (value) => {
      const { onChange } = this.props;
      const { data } = this.state;
      let result = undefined
      for(let i = 0; i < data.length; i++) {
        const item = data[i];
        if(item.id === value) {
          result = value;
        }
      }
      onChange(result);
    this.setState({
      value,
      fetching: false,
    });
  };

  render() {
    const { fetching, data } = this.state;
    const { value,disabled} = this.props;
    return (
      <Select
      disabled={disabled}
      ref={this.selectRef}
        value={value}
        placeholder="请选择送货方式"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{width: '100%'}}
      >
        {data.map(d => (
            <Option key={d.id} value={d.id}>{d.sname}</Option>
        ))}
      </Select>
    );
  }
}
export default StoreHouseField;