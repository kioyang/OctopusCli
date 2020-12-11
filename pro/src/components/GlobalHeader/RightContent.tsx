import { Tooltip, Tag } from 'antd';
import { Settings as ProSettings } from '@ant-design/pro-layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Select } from 'antd';
import { connect, ConnectProps } from 'umi';
import { ConnectState } from '@/models/connect';
import { GlobalDensity } from '@/config/style'
import Avatar from './AvatarDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends Partial<ConnectProps>, Partial<ProSettings> {
  theme?: ProSettings['navTheme'] | 'realDark';
}

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <>
      <div className={className}>
        <Tooltip title="使用文档">
          <a
            style={{
              color: 'inherit',
            }}
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <QuestionCircleOutlined />
          </a>
        </Tooltip>
        <Avatar />
        <Select size="small" onChange={(value) => {
          const { dispatch } = props;
          console.log(value, 'value')
          localStorage.setItem('ps-density', value);
          dispatch({
            type: 'global/save',
            payload: { density: value || 8 }
          })
          location.reload();
        }} defaultValue={parseInt(localStorage.getItem('ps-density') || 'undefined') || GlobalDensity.normal} style={{ width: 120, position: 'relative', top: 4 }}>
          <Select.Option value={GlobalDensity.veryLoose}>极致宽松</Select.Option>
          <Select.Option value={GlobalDensity.loose}>宽松</Select.Option>
          <Select value={GlobalDensity.normal}>正常布局</Select>
          <Select.Option value={GlobalDensity.tight}>紧凑</Select.Option>
          <Select.Option value={GlobalDensity.veryTight}>极致紧凑</Select.Option>
        </Select>
        <Select size="small" onChange={(value) => {
          const { dispatch } = props;
          dispatch({
            type: 'global/save',
            payload: { theme: value || 'white' }
          })
        }} defaultValue={'white'} style={{ width: 120, position: 'relative', top: 4 }}>
          <Select.Option value='white'>经典皮肤</Select.Option>
          <Select.Option value='black' disabled>暗夜黑</Select.Option>
          <Select.Option value='blue' disabled>冰川蓝</Select.Option>
        </Select>
        <Select size="small" onChange={(value) => {
          const { dispatch } = props;
          dispatch({
            type: 'global/save',
            payload: { style: value || 'cartoon' }
          })
        }} defaultValue={'classic'} style={{ width: 120, position: 'relative', top: 4 }}>
          <Select.Option value='cartoon' disabled>卡通风格</Select.Option>
          <Select.Option value='classic'>经典风格</Select.Option>
          <Select.Option value='blue' disabled>古典风格</Select.Option>
        </Select>
      </div>
    </>
  );
};

export default connect(({ settings, global }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  userInfo: global.userInfo,
}))(GlobalHeaderRight);
