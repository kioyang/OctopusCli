import React from 'react';
import { connect } from 'dva';
import styles from './Login.less';
import {
    UserOutlined
} from '@ant-design/icons';
import { Input, Button, Form, Checkbox } from 'antd';
const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};

class Login extends React.Component {

    login = () => {
        const { dispatch } = this.props;
        this.form.validateFields()
            .then((values) => {
                console.log(values);
                const uname = values.fakeusername;
                const pass = values.fakepassword;
                dispatch({
                    type: 'login/login',
                    payload: { username: uname, password: pass }
                });
            })
            .catch((e) => {
                console.log(e);
            })
    }
    render() {
        return (
            <div className={styles.login}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    ref={(el) => { this.form = el; }}
                    className={styles.form}
                >
                    <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Microsoft Yahei,sanserif', marginBottom: 16 }}>深粮冷链用户信息管理平台</h2>
                    <Form.Item
                        name="fakeusername"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input suffix={<UserOutlined />} className={styles.input} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="fakepassword"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password className={styles.input} placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={this.props.loading}
                            onClick={this.login}
                            className={styles.button} style={{ width: '100%' }} type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default connect(({ loading }) => {
    return {
        loading: loading.effects['login/login']
    }
})(Login);