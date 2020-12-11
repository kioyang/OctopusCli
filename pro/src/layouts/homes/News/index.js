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
    { title: '冷链动态', component: Words },
    { title: '行业动态', component: Intro }
]

class Index extends React.Component {
    state = { activeKey: 1 };
    render() {
        const width = (window.innerWidth - 1200) / 2;
        const { activeKey } = this.state;
        const activeItem = contents[activeKey - 1];
        console.log(activeItem,'activeItem');
        const ActiveComponent = activeItem.component;
        console.log(activeKey,'activeKey')
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
                <div>
                    <div className={styles.leftblock} />
                    <div className={styles.centerblock}>
                        <section className={styles.leftMenu}>
                            <h1 style={{ width: 140, borderBottom: '1px solid #EEEEEE' }}>新闻资讯</h1>
                            <ul>
                                {
                                    contents.map((item, index) => {
                                        const Componet = item.component;
                                        const key = index;
                                        return (
                                            <li
                                                className={activeKey === key + 1 ? styles.active: ''}
                                                onClick={() => {
                                                    this.setState({
                                                        activeKey: index + 1,
                                                    })
                                                }}
                                            >{item.title}</li>
                                        )
                                    })
                                }
                            </ul>
                        </section>
                        <section className={styles.rightMenu}>
                              <ActiveComponent />  
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index;