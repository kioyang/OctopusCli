import React from 'react';
import { Button } from 'antd';

import styles from './index.less';

class FixedBottom extends React.PureComponent {
    render() {
        const { children } = this.props;
        return (
            <div className={styles.fixedBottom}>
                {children}
            </div>
        );
    }
}

export default FixedBottom;