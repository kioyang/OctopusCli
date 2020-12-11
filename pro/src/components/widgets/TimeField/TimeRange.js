import { DatePicker } from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';
const { RangePicker } = DatePicker;

class DatePickerField extends React.Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  state = {
    value: undefined,
  };

  handleChange = (value) => {
    console.log(value,'value');

    const { onChange } = this.props;
    const value1 = value[0];
    const value2 = value[1];
    const datetimestr1 = value1.format('yyyy-MM-DD 00:00:00');
    const datetimestr2 = value2.format('yyyy-MM-DD 23:59:59');
    onChange([datetimestr1,datetimestr2]);
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.props;
    console.log(value, 'valll')
    return (
      <RangePicker
        ref={this.selectRef}
        value={value && value[0] ? [moment(value[0]),moment(value[1])] : undefined}
        placeholder="请选择时间"
        onChange={this.handleChange}
        style={{ width: '100%' }}
      />
    );
  }
}
export default DatePickerField;