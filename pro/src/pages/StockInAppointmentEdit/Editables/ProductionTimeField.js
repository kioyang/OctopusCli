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
    const { onChange,onVary } = this.props;
    const datetimestr = value.format('yyyy-MM-DD');
    onChange(datetimestr);
    onVary({productiondate: datetimestr})
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.props;
    return (
      <DatePicker
        ref={this.selectRef}
        value={value ? moment(value) : undefined}
        placeholder="请选择时间"
        onChange={this.handleChange}
        open
        style={{ width: '100%' }}
      />
    );
  }
}
export default DatePickerField;