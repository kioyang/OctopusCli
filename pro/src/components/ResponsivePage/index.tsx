/**
 * 1.页面高度保证根节点无滚动条
 * 2.可以设置块的最小高度
 * 3.可以设置块的默认收缩 悬浮状态
 * 将父容器的高度信息传给各个子组件
 */
import React from 'react';
import { connect } from 'dva';

import { OOMTransfer } from '@/utils/OOM'

import styles from './index.less';

interface IResponsive {
    pageDom: any;
    state: any;
}

interface IProps {
    density: number;//紧凑度
    theme: string; // 主题
    style: any;
}

class ResponsivePage extends React.Component<IProps> implements IResponsive {
    pageDom: any;
    state = { pageHeight: 0, heights: {} };

    componentDidMount() {
        if (this.pageDom) {
            const map = {
                offsetTop: 'offsetTop',
                offsetHeight: 'offsetHeight',
                clientHeight: 'clientHeight',
                scrollHeight: 'scrollHeight',
                scrollTop: 'scrollTop',
            };
            const heights = OOMTransfer(this.pageDom, map);
            const { density = 8, children = [] } = this.props;
            this.setState({
                pageHeight: this.pageDom.clientHeight - density * React.Children.count(children),
                heights,
            });
        }
    }

    // 类数组
    computeStyle = (pageHeight: number) => {
        console.log(pageHeight, 'COMPUTESTYLE');
        const { children } = this.props;
        const heightBlock = {};
        const computeBlock = {};
        let reduceHeight = 0; // 累计高
        React.Children.forEach(children, (item: any, index: number) => {
            const { height = 0 } = item.props;
            if (height === 0) {
                computeBlock[index] = { computeHeight: 0 };
            } else {
                heightBlock[index] = { computeHeight: height };
            }
            reduceHeight += height;
        });
        const keys = Object.keys(computeBlock) || [];
        const num = keys.length || 0;
        const remainHeight = pageHeight - reduceHeight;
        const averageHeight = remainHeight / num;
        const { density } = this.props;
        for (let x in computeBlock) {
            computeBlock[x].computeHeight = averageHeight + density;
        }
        if(React.Children.count(children) === 1) {
            computeBlock[0].compuputeHeight = pageHeight;
        }
        return { ...heightBlock, ...computeBlock };
    }

    render() {
        const { children, density = 8, theme = 'white',style = {} } = this.props;
        const { pageHeight, heights } = this.state;
        const blocks = this.computeStyle(pageHeight);
        const items = React.Children.map(children, (item: any, index: number) => {
            return React.cloneElement(item, { pageHeight, heights, computeHeight: blocks[index].computeHeight });
        });
        const rpname = styles[`responsivepage${density}`];
        const colorname = `theme${theme}`;
        return (
            <div
                ref={(el) => { this.pageDom = el; }}
                style={style}
                className={`${rpname} ${colorname}`}>
                {items}
            </div>
        )
    }
}

export default connect(({ global }) => {
    return {
        density: global.density || 8, // 紧凑度
        theme: global.theme || 'white' // 主题
    }
})(ResponsivePage);