
import React from 'react'
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
const MenuDown = ()=> {
  const handleMenuClick= (MenuInfo:MenuInfo)=>{
    console.log(MenuInfo);
  }
  return (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  )
}

export default  MenuDown
