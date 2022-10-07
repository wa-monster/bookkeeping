import React,{FC} from 'react'
import { Tabs } from 'antd';
import { NoticePageType } from '../../type/layout'
import ShowSettlement from '../../components/ShowSettlement'
import './NoticePage.css'
import { TabPanekey } from '../../until/enum'
const { TabPane } = Tabs;

const NoticePage:FC<NoticePageType> = () =>{
  return (
    <div className="notice-page">
      <div className="tab-box">
        <Tabs tabPosition="left">
          <TabPane tab="天" key={TabPanekey.day}>
            <ShowSettlement key={TabPanekey.day} />
          </TabPane>
          <TabPane tab="周" key={TabPanekey.week}>
            <ShowSettlement key={TabPanekey.week}/>
          </TabPane>
          <TabPane tab="月" key={TabPanekey.mouth}>
            <ShowSettlement key={TabPanekey.mouth}/>
          </TabPane>
          <TabPane tab="年" key={TabPanekey.year}>
            <ShowSettlement key={TabPanekey.year}/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default NoticePage 
