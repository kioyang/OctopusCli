import React from 'react';
import { Select } from 'antd';

const statusMap = [
    { value: 1, name: '拟稿' },
    { value: 58, name: '缺货中' },
    { value: 59, name: '待检测' },
    { value: 2, name: '审批中' },
    { value: 4, name: '审批通过' },
    { value: 60, name: '处理中' },
    { value: 99, name: '作废' },
]
const { Option } = Select;

const url = '/portal/queryDataBase.do?event=queryDataBaseViewPageList&page=1&limit=1000&queryColumn=storehouse&type=0&whereColumnName=sname&billType=trsoutboundappointment';

class AsyncSelect extends React.Component {
    state = { value: undefined };

    componentDidMount() {
        this.getValuePairs();
    }

    getValuePairs = () => {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            console.log(res, 'res');
        });
    }

    render() {
        const options = statusMap.map((item) => {
            return (
                <Option value={item.value}>{item.name}</Option>
            )
        })
        return (
            <Select
                value={this.state.value}
                onChange={(value) => {
                    this.setState({
                        value,
                    })
                    const { onChange } = this.props;
                    onChange(value);
                }}>
                {options}
            </Select>
        )
    }
}

export default AsyncSelect;