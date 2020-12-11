import React from 'react';
import { Button } from 'antd';

interface IProps {
    permissions: string[]; // 权限keys
    permissionKey: string;// 当前的权限key
    onClick: Function;
    title: string;// 权限名
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
        const { title = '编辑' } = this.props;
        const large = parseInt(localStorage.getItem('ps-density') || '1') > 8;
        return (
            <Button
                style={{marginBottom: large ? 4 : 0,marginLeft:4,fontFamily: 'Microsoft Yahei UI Bold,Microsoft Yahei, sans-serif'}}
                size={large ? 'large' : 'small'}
                disabled={this.checkPermission()}
                onClick={this.permissionClick}
            >
                {title}
            </Button>
        )
    }
}
export default AuthorizedButton;