import React from 'react';
import { Carousel } from 'antd';
import styles from './index.less';
import Intro from './Intro'
import Words from './Words'
import Tigle from '@/layouts/homes/widgets/Tigle';
import JiuList from '@/layouts/homes/widgets/JiuList'

function onChange(a, b, c) {
    console.log(a, b, c);
}

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const dataSource = [
    { title: <h1>仓储业务</h1>, pic: './bq.jpg' },
    { title: '仓储园区', pic: './bq1.jpg' },
    { title: '物流业务', pic: './bq2.jpg' },
    { title: '采购贸易', pic: './bq3.jpg' }
]

const dataSource1 = [
    { title: <h1>仓储业务</h1>, pic: './bq.jpg' },
    { title: '仓储园区', pic: './bq1.jpg' },
    { title: '物流业务', pic: './bq2.jpg' },
    { title: '采购贸易', pic: './bq3.jpg' }
]
const dataSource2 = [
    { title: <h1>仓储业务</h1>, pic: './bq.jpg' },
    { title: '仓储园区', pic: './bq1.jpg' },
    { title: '物流业务', pic: './bq2.jpg' },
    { title: '采购贸易', pic: './bq3.jpg' }
]

const contents = [
    { title: '总经理致词', component: Words },
    { title: '企业介绍', component: Intro }
]

class Index extends React.Component {
    state = { activeKey: 1 };
    render() {
        const width = (window.innerWidth - 1200) / 2;
        const { activeKey } = this.state;
        const activeItem = contents[activeKey - 1];
        console.log(activeItem, 'activeItem');
        const ActiveComponent = activeItem.component;
        console.log(activeKey, 'activeKey')
        return (
            <div className={styles.about}>
                <Carousel afterChange={onChange}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <div className={styles.centerblock}>
                    <Tigle
                        mainTitle="业务概览"
                        subTitle='构建 "数据仓储，数据物流，数据流通，数据管理"的智慧仓储物流供应链服务产业体系' />
                    <JiuList
                        style={{ border: 'none' }}
                        cardStyle={{ border: 'none',height:500 }}
                        marginLeft={16}
                        dataSource={dataSource} />
                    <Tigle
                        mainTitle="合作客户"
                        subTitle="冷链给越来越多的客户提供优质服务" />
                    <JiuList
                        dataSource={dataSource1}
                        style={{ border: 'none',borderBottom: '1px solid #fff' }}
                        cardStyle={{ border: 'none',height:100 }}
                        marginLeft={1}

                    />
                    <JiuList
                        style={{ border: 'none' }}
                        cardStyle={{ border: 'none',height: 100 }}
                        marginLeft={1}
                        dataSource={dataSource2}
                    />

                </div>
            </div>
        )
    }
}

export default Index;