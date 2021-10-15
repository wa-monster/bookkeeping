import React,{FC} from 'react'
import { Tabs } from 'antd';
import { NoticePageType } from '../../type/layout'
import './NoticePage.css'

const { TabPane } = Tabs;

const NoticePage:FC<NoticePageType> = () =>{
  return (
    <div className="notice-page">
      <div className="tab-box">
        <Tabs tabPosition="left">
          <TabPane tab="天" key="1">天</TabPane>
          <TabPane tab="周" key="2">周</TabPane>
          <TabPane tab="月" key="3">月</TabPane>
          <TabPane tab="年" key="4">年</TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default NoticePage 
