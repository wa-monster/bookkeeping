import React,{useState,FC} from 'react'
import {ShowSettlementType} from '../type/components'
import { Button  } from 'antd';
import DetailBox from './SettlementComponent/DetailBox'
import EchartsBox from './SettlementComponent/EchartsBox'
import AddItem from './SettlementComponent/AddItem'
import './ShowSettlement.scss'

import {money} from '../utils/filter'
const useSettlement:FC<ShowSettlementType> = ()=>{
  const [income] = useState(0)
  const [pay] = useState(0)
  const [toal] = useState(0)
  // 
  const [isShowAdd,setIsShowAdd] = useState(false)
  const addIncome = ()=>{
    setIsShowAdd(true)
  } 
  const closeIncome = ()=>{
    setIsShowAdd(false)
  }
  // 
  const [isDetail,setDetail] = useState(false)
  const lookDetail = ()=>{
    setDetail(!isDetail)
  }

  return (
    <div className="show-settlement">
      <div className="reve-expend-title">收支统计</div>
      <div className='reve-expend-content'>
        <div className='reve-expend-content-item'>
          <div>收入</div> 
          <div className='income'>{money(income)}</div>
        </div>
        <div className='reve-expend-content-item'>
          <div>支出</div> 
          <div className='pay'>{money(pay)}</div>
        </div>
        <div className='reve-expend-content-item'>
          <div>总计</div> 
          <div>{money(toal)}</div>
        </div>
      </div>
      <div className="add">
        {isShowAdd ?
          <Button onClick={closeIncome}>关闭</Button>
          :
          <Button onClick={addIncome}>新增</Button> 
        }
      </div>
      {isShowAdd ?
        <AddItem closeIncome={closeIncome}></AddItem>
        :
        null
      }
      <Button onClick={lookDetail}>{isDetail ? '详情':'图表'}</Button> 
      {isDetail ?
        <EchartsBox></EchartsBox>
        :
        <DetailBox></DetailBox>
      }
    </div>
  )
}
export default useSettlement
