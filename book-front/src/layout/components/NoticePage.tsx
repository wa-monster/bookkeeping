import React,{FC} from 'react'
import { Tabs } from 'antd';
import { NoticePageType } from '../../type/layout'
import ShowSettlement from '../../components/ShowSettlement'
import DetailList from 'src/components/DetailList/DetailList'
import './NoticePage.scss'
import { TabPanekey } from '../../utils/enum'
const { TabPane } = Tabs;

const NoticePage:FC<NoticePageType> = () =>{
  return (
    <div className="notice-page">
      <div className="tab-box">
        <Tabs tabPosition="left">
          {/* <TabPane tab="天" key={TabPanekey.day}>
            <ShowSettlement keyIndex={TabPanekey.day} />
          </TabPane>
          <TabPane tab="周" key={TabPanekey.week}>
            <ShowSettlement keyIndex={TabPanekey.week}/>
          </TabPane> */}
          <TabPane tab="总计" key={TabPanekey.mouth}>
            <ShowSettlement keyIndex={TabPanekey.mouth}/>
          </TabPane>
          <TabPane tab="详细" key={TabPanekey.year}>
            <DetailList keyIndex={TabPanekey.year}/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
export default NoticePage 
