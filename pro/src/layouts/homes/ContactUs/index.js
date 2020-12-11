import React from 'react';
import { Carousel } from 'antd';
import styles from './index.less';
import Intro from './Intro'
import Words from './Words'

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
                    <section className={styles.map}>
                    </section>
                    <section className={styles.info}>
                        <div className={styles.info1}>
                        </div>
                        <div className={styles.info2}>
                            
                        </div>
                    </section>
                    <div style={{ height: 16, clear: 'both' }} />
                    <section className={styles.bottom}>
                        <h1>联系我们</h1>
                        <ul>
                            <li>
                                <span>邮编：</span>
                                <span style={{ color: '#111', fontWeight: 'bold' }}>334324324</span>
                            </li>
                            <li>
                                <span>邮编：</span>
                                <span style={{ color: '#111', fontWeight: 'bold' }}>334324324</span>
                            </li>
                            <li>
                                <span>客服部：</span>
                                <span style={{ color: '#111', fontWeight: 'bold' }}>334324324</span>
                            </li>
                            <li>
                                <span>物流部：</span>
                                <span style={{ color: '#111', fontWeight: 'bold' }}>334324324</span>
                            </li>

                            <li>
                                <span>传真：</span>
                                <span style={{ color: '#111', fontWeight: 'bold' }}>334324324</span>
                            </li>

                        </ul>
                    </section>
                </div>
            </div>
        )
    }
}

export default Index;