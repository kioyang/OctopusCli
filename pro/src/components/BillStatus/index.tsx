/**
 * 单据状态显示组件
 */
import React from 'react';

import { Tag } from 'antd';

const statusMap = {
    1: '拟稿',
    58: '缺货中',
    59: '待检测',
    2: '审批中',
    4: '审批通过',
    60: '处理中',
    99: '作废',
    undefined: '状态未知'
}
const statusColorMap = {
    2: '#52C41A',
    4: '#5247B0',
    58: '#5247B0',
    99: '#FF4D4F'
}
interface IProps {
    status: number;
}
class BillStatus extends React.PureComponent<IProps> {

    render() {
        const {status = undefined} = this.props;
        const text = statusMap[`${status}`];
        const color = statusColorMap[`${status}`] || '#1890ff';
        return (
            <span style={{color}}>
                {text}
            </span>);
    }
}

export default BillStatus;