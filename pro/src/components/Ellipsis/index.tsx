import { Tooltip } from 'antd'
import React from 'react'

interface IProps {
    title: string;
}
class Ellipsis extends React.Component<IProps> {
    render() {
        const { children, title = '' } = this.props;
        return (
            <Tooltip title={title}>
                <div>
                {children}
                </div>
            </Tooltip>
        )
    }
}
export default Ellipsis;