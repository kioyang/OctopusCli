import React from 'react'
import styles from './index.less';

class Tigle extends React.PureComponent {
    render() {
        const { mainTitle,subTitle } = this.props;
        return (
            <div className={styles.tigle}>
                <h1>{mainTitle}</h1>
                <h2>{subTitle}</h2>
            </div>
        )
    }
}

export default Tigle;