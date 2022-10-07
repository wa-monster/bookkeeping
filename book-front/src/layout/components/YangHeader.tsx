import React from 'react'
import {  Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './YangHeader.scss'
import MenuDown from './MenuDown'

const YangHeader =  () => {

  return (
    <div className="header-box">
      <div className="header-content">
        <h1>杨大爷记账</h1>
        <Dropdown.Button overlay={MenuDown} placement="bottomCenter" icon={<UserOutlined />}>
          Dropdown
        </Dropdown.Button>
      </div>
    </div>
  )
}
export default YangHeader