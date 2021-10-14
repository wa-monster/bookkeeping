import React from 'react'
import {  Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './YangHeader.css'
import menudown from './menudown'




const YangHeader =  () => {

  return (
    <div className="header-box">
      <div className="header-content">
        <h1>记账</h1>
        <Dropdown.Button overlay={menudown} placement="bottomCenter" icon={<UserOutlined />}>
          Dropdown
        </Dropdown.Button>
      </div>
    </div>
  )
}
export default YangHeader