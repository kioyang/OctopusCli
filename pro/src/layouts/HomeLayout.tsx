import React,{ useState } from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
    useHistory,
    Link,
} from "react-router-dom";
import styles from './homes/home.less';
import Home from './homes/Home';
import About from './homes/About';
import Overview from './homes/Overview';
import News from './homes/News';
import ContactUs from './homes/ContactUs';

import HomeFooter from '@/components/HomeFooter'

export default function Index(props) {
    const { location } = useHistory();
    const { history } = props;
    const { pathname } = location;
    const [path,setPath] = useState(pathname);
    return (
        <Router>
            <main className={styles.home}>
                <header className={styles.header}>
                    {/* 左边logo */}
                    <section className={styles.leftLogo}>
                        <img src="/-s-img_logo.png" alt="" />
                    </section>
                    {/* 中间菜单 */}
                    <section className={styles.centerMenu}>
                        <ul>
                            <li
                            onClick={() => {
                               setPath('/home');
                               history.replace('/home');
                            }}
                            className={path === '/home' ? styles.active : ''}>
                                <Link style={{height: 64 }} to="/home">首页</Link>
                            </li>
                            <li
                            onClick={()=> {
                                setPath('/home/about')
                                history.replace('/home/about');
                            }}
                            className={path === '/home/about' ? styles.active : ''}>
                                <Link style={{height: 64}} to="/home/about">关于冷链</Link>
                            </li>
                            <li
                            onClick={() => {
                                setPath('/home/overview');
                                history.replace('/home/overview')
                            }}
                            className={path === '/home/overview' ? styles.active : ''}>
                                <Link to="/home/overview">业务概览</Link>
                            </li>
                            <li
                             onClick={() => {
                                setPath('/home/news');
                                history.replace('/home/news');
                            }}
                            className={path === '/home/news' ? styles.active : ''}>
                                <Link to="/home/news">咨询动态</Link></li>
                            <li
                             onClick={() => {
                                setPath('/home/contactus');
                                history.replace('/home/contactus')
                            }}
                            className={path === '/home/contactus' ? styles.active : ''}>
                                <Link to="/home/contactus">联系我们</Link></li>
                        </ul>
                    </section>
                    {/* 右边按钮 */}
                    <section className={styles.rightButton}>
                        <a
                        className={`${styles.btn} ${styles['btn-white']}`} href="#/login" target="/blank">注册</a>
                        <a className={styles.btn} href="#/login" target="/blank">登录</a>
                    </section>
                </header>
                <div style={{height:64}} />
                <div className={styles.bodyContent}>
                    <Switch>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route path="/home/about">
                            <About />
                        </Route>
                        <Route path="/home/overview">
                            <Overview />
                        </Route>
                        <Route path="/home/news">
                            <News />
                        </Route>
                        <Route path="/home/contactus">
                            <ContactUs />
                        </Route>
                    </Switch>
                      <HomeFooter />
                </div>
            </main>
        </Router>
    );
}
