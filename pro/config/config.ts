// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import MenuConfig from './MenuConfig'
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
const customStyles:any = {
  'primary-color': '#1890ff', // 全局主色
  'link-color': '#312D4A',
  'success-color': '#52c41a',// 成功色
  'warning-color': '#faad14',//警告色
  'error-color': '#f5222d',// 错误色
  'heading-color': 'rgba(255,255,255,1)', // 标题色
  'text-color': 'rgba(255,255,255,1)',// 主文本色
  'text-color-secondary': 'rgba(255,255,255,0.45)',// 次文本色
  'disabled-color': 'rgba(255,255,255,0.25)', // 失效色
  'border-radius-base': '2px',
  'border-color-base': '#1890ff',//边框色
  'component-background': '#312D4A',
  'body-background': '#080C10',
  'item-hover-bg': '#312D4A',
}

const env = process.env.NODE_ENV;
console.log(env, 'env');
let extra = {};

if (env !== 'development') {
  extra = {
    exportStatic: {
      //部署到任意路径
      dynamicRoot: true,
      //转换html
      htmlSuffix: true,
    },
  }
}

export default defineConfig({
  // ...extra,
  hash: true,
  antd: { dark:false },
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  // 浏览器兼容
  targets: {
    chrome: 49,
    firefox: 64,
    safari: 10,
    edge: 13,
    ios: 10,
    ie:8
  },
  // umi routes: https://umijs.org/docs/routing
  routes: MenuConfig,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
    'component-background': '#fff'
    // ...customStyles,
  },
  // @ts-ignore
  title: false,
  history: { type: 'hash'},
  ignoreMomentLocale: true,
  publicPath: './',
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
