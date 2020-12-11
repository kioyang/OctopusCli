import React from 'react';

import styles from './Jiu.less';
import JiuCard from './JiuCard';


interface IProps {
    dataSource: Array<object>;
    rows: number;
    marginLeft: number;
    cardStyle: any;
}

class JiuList extends React.Component<IProps> {
    rows = 4;
    render() {
        const { rows = 4, marginLeft = 4, dataSource = [], cardStyle,style = {} } = this.props;
        console.log(cardStyle,'CARDsTYLE')
        const totalMargin = (rows - 1) * marginLeft;
        const width = `calc((100% - ${totalMargin}px) / ${rows})`
        const cards = dataSource && dataSource.map((item: any, index) => {
            let left = marginLeft;
            if (index === 0) {
                left = 0;
            }
            return (
                <div className={styles.jiuCard} style={{ ...cardStyle,marginLeft: left, width: width,overflow: 'hidden' }}>
                    <JiuCard title={item.title} pic={item.pic} />
                </div>
            )
        })
        return (
            <div className={styles.jiu} style={style}>
                {cards}
            </div>
        )
    }
}
export default JiuList;