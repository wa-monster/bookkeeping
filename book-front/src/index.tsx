import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css'
import 'antd/dist/antd.css'
import {ConfigProvider } from 'antd'
//设置rem
// import './until/rem'
import App from './layout/App';
import './index.css'
// 设置中文
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment'

import {initElectronRes} from 'src/utils/res'

moment.locale('zh-cn');
initElectronRes()
ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


