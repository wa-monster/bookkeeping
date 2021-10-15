
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
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  )
}

export default  MenuDown
