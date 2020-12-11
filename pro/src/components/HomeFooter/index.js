
import React from 'react';

const CustomFooter = (props) => {
    const { copyright = `${new Date().getFullYear()} 深圳市深远数据技术有限公司` } = props;
    return (
        <footer style={{textAlign: 'center',background: '#111',padding:'10px 0'}}>
            <span style={{color: '#fff'}}>&copy;{copyright}</span>
        </footer>
    )
}
export default CustomFooter;