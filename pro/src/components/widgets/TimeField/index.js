import { DatePicker } from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';


class DatePickerField extends React.Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  state = {
    value: undefined,
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    const datetimestr = value.format('yyyy-MM-DD HH:mm:ss');
    onChange(datetimestr);
    this.setState({
      value,
    });
  };

  render() {
    const { value,disabled } = this.props;
    return (
      <DatePicker
      disabled={disabled}
        ref={this.selectRef}
        value={value ? moment(value) : undefined}
        placeholder="请选择时间"
        onChange={this.handleChange}
        style={{ width: '100%' }}
      />
    );
  }
}
export default DatePickerField;