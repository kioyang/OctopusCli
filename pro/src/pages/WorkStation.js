import { divide } from 'lodash';
import React from 'react';
import { Row, Col } from 'antd';
import styles from './WorkStation.less';
import CustomFooter from '@/components/CustomFooter'
import { history } from 'umi';
import { connect } from 'dva';

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="/login">退出登录</a>
        </Menu.Item>
    </Menu>
);


const EntryCard = (props) => {
    const { title, picUrl,url } = props;
    return (
        <div className={styles.entrycard}
        onClick={() => {
            console.log(url)
            history.replace(url);
        }}
        >
            <img src={picUrl} />
            <h2 style={{fontSize: 16,fontWeight:'normal'}}>{title}</h2>
        </div>
    )
}

const pageResponsive = {
    xxl: { span: 8 },
    xl: { span: 8 },
    lg: { span: 12 },
    sm: { span: 24 },
    xs: { span: 24 },
};

const config = [
    { title: '商品管理', picUrl: './-s-icon_spgl.png',url: '/stock/GoodsStock' },
    { title: '入库管理', picUrl: './-s-img_kcgl.png',url: '/stockin/stockInAppointment' },
    { title: '出库管理', picUrl: './-s-img_yygl.png',url: '/stockout/OutboundAppointment'},
    { title: '报表管理', picUrl: './-s-img_dzgl.png',url: '/report/ThroughPutDetail' },
    { title: '合同管理', picUrl: './-s-img_htgl.png',url: '/home' },
    { title: '缺货管理', picUrl: './-s-img_yjgl.png',url: '/home/about'},
];

class WorkStation extends React.Component {
    render() {
        const { userInfo = {}} = this.props;
        return (
            <>
                <div className={styles.workstationwrapper} />
                <main className={styles.workstation}>
                    <section className={styles.topmenu}>
                        <div className={styles.left}>
                            <img src="./-s-img_logo.png" style={{ float: 'left', width: 64 }} />
                            <h1>深粮冷链用户信息管理平台</h1>
                        </div>
                        <div className={styles.right}>
                            <ul>
                                <li style={{paddingTop:5}}>
                                    <Dropdown overlay={menu} trigger={['click']}>
                                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                            欢迎您，{userInfo.userName} <DownOutlined />
                                        </a>
                                    </Dropdown>
                                </li>
                                <li>
                                    <img src="./-s-img_logo.png" style={{ width: 30,margin:'0 12px' }} />
                                </li>
                                <li style={{paddingTop:5}}>
                                    &nbsp;&nbsp;深粮控股股份有限公司&nbsp;&nbsp;
                            </li>
                            </ul>
                        </div>
                    </section>
                    <section className={styles.entry}>
                        <div className={styles.entryContent}>
                            <Row>
                                {
                                    config.map((item) => {
                                        return (
                                            <Col key={item.title} {...pageResponsive}>
                                                <EntryCard title={item.title} picUrl={item.picUrl} url={item.url} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </div>
                    </section>
                    <section className={styles.footer}>
                        <CustomFooter />
                    </section>
                </main>
            </>
        )
    }
}

export default connect(({ global })=> {
    console.log(global,'global')
    return {
        userInfo: global.userInfo || {},
    }
})(WorkStation);