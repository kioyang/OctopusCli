import React from 'react';
import { message, Popconfirm, Button } from 'antd';

interface IProps {
    permissions: string[]; // 权限keys
    permissionKey: string;// 当前的权限key
    onClick: Function;
    title: string;// 权限名
    record: any;
}

class AuthorizedButton extends React.Component<IProps> {

    checkPermission = () => {
        const { permissions, permissionKey } = this.props;
        let disabled = false;
        if (!permissions.includes(permissionKey)) {
            disabled = true;
        }
        return disabled;
    }

    permissionClick = () => {
        const { onClick = () => { } } = this.props;
        if (typeof onClick === 'function') {
            onClick();
        }
    }

    render() {
        const { title = '编辑', record } = this.props;
        const style = { fontWeight: 'bold' };
        const large = parseInt(localStorage.getItem('ps-density') || '1') > 8;
        return (
            <Popconfirm
                title={() => {
                    return (
                        <>
                            <div>确定删除编号为</div>
                            <div><span style={style}>{record.snumber}</span></div>
                            <div>的单据吗</div>
                        </>
                    );
                }}
                okText="确定"
                cancelText="取消"
                onConfirm={this.permissionClick}
            >
                <Button
                    style={{ marginBottom: large ? 4 : 0, marginLeft: 4, fontFamily: 'Microsoft Yahei UI Bold,Microsoft Yahei, sans-serif' }}
                    size={large ? 'large' : 'small'}
                    danger
                    disabled={this.checkPermission()}
                >
                    {title}
                </Button>
            </Popconfirm>
        )
    }
}
export default AuthorizedButton;