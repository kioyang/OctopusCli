import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import { OOMTransfer } from '@/utils/OOM'
import {Button } from 'antd';

interface IProps {
    style: any; // 样式
    children: any; // 子组件
    height: number; // 由父组件传给子组件
}

// 响应式接口
interface IResponsive {
    block:any; // 响应式块实例
}

/**
 * 各个块的高度相加等于ResponsivePage的高度 以保证父容器无滚动条
 */

class ResponsiveBlock extends React.Component<IProps> implements IResponsive {

    block: any = React.createRef();
    state = {
        collapse:false,
        scrollHeight: 0,
        clientHeight: 0,
        offsetHeight: 0,
    }

    componentDidMount() {
        console.log(this.block, 'bloc');
        if(this.block) {
            const map = {
                offsetTop: 'offsetTop',
                offsetHeight: 'offsetHeight',
                clientHeight: 'clientHeight',
                scrollHeight: 'scrollHeight',
                scrollTop: 'scrollTop',
            };
            const heights = OOMTransfer(this.block,map);
            this.setState({...heights,collapse: false});
        }
    }

    componentWillReceiveProps() {
        if(this.block) {
            const that = this;
            setTimeout(() => {
                const map = {
                    offsetTop: 'offsetTop',
                    offsetHeight: 'offsetHeight',
                    clientHeight: 'clientHeight',
                    scrollHeight: 'scrollHeight',
                    scrollTop: 'scrollTop',
                };
                const heights = OOMTransfer(that.block,map);
                console.log(heights,'blockprops');
                that.setState({...heights,collapse: false});
            },0)
        }
    }

    toggleHeight = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    genCollapseButton = () => {
        const { scrollHeight } = this.state;
        const { computeHeight,height } = this.props;
        const show = height && scrollHeight > computeHeight;
        return show ? (
            <Button
            size="small"
            onClick={this.toggleHeight}
            className={styles.collapseBtn}
            type="primary"
            >
            <span>
                {this.state.collapse ? '收缩' : '展开'}
            </span>
            </Button>)
            :
            null
    }
    
    render() {
        const { children, style,computeHeight = 88,density = 8 } = this.props;
        const heightStyle = { height:computeHeight };
        const paddingStyle = { padding: `${density / 2}px ${density * 1.5}px` };
        const marginStyle = { margin: `${density / 2}px ${density / 2}px`};
        const collapseStyle = this.state.collapse ? { height: this.state.scrollHeight} : { height: computeHeight };
        const items = React.Children.map(children, (item: any) => {
            return React.cloneElement(item, {
                containerHeight: computeHeight,
            });
        });
        return (
            <>
                <div
                    ref={(el) => {
                        this.block = el;
                    }}
                    className={`${styles.responsiveblock}`}
                    style={{ ...style, ...heightStyle,...paddingStyle,...marginStyle,...collapseStyle,...style}} >
                    {items}
                    {this.props.density ? this.genCollapseButton() : this.genCollapseButton()}
                </div>
            </>
        );
    }
}

export default connect(({global}) => {
    return {density: global.density || 8}
})(ResponsiveBlock);