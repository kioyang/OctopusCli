import React from 'react';
import styles from './index.less';

interface IProps {
    title: string;
}
class TitleBar extends React.PureComponent<IProps> {
    render() {
        const { title,children,style = {} } = this.props;
        return (
            <div className={styles['title-bar']}>
            <div
            className={styles.fieldset}
            style={style}
            >
                <span className={styles.legend}>{title}</span>
            </div>
            {children}
            </div>
        )
    }
}

export default TitleBar;