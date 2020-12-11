import { connect } from 'dva';
import { GlobalStyle,BlockStyleMap } from '@/config/style';

const CustomFooter = (props) => {
    const { densityStyle } = props;
    const defaultStyle = BlockStyleMap[densityStyle];
    const { copyright = `${new Date().getFullYear()} 深圳市深远数据技术有限公司` } = props;
    return (
        <footer style={{ ...defaultStyle,textAlign: 'center'}}>
            <span style={{color: '#bbb'}}>&copy;{copyright}</span>
        </footer>
    )
}
export default connect(({global}) => {
    return { densityStyle: global.densityStyle || GlobalStyle.tight} // 样式密度
})(CustomFooter);