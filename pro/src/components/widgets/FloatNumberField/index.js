import { divide } from 'lodash';
import React from 'react';
import { Input } from 'antd';

class FloatNumberField extends React.Component {
    state = { value: undefined }
    onChange = (event) => {
        this.setState({
            value: event.target.value,
        });
        const { onChange } = this.props;
        if(onChange) {
            console.log(onChange,'onChange')
            onChange(event.target.value);
        }
    }

    render() {
        return (
            <Input value={this.state.value}
                onChange={this.onChange}
            />
        )
    }
}
export default SnumberField;