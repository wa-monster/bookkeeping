import React,{useState,FC} from 'react'
import {ShowSettlementType} from '../type/components'
import { Button } from 'antd';
import DetailBox from './DetailBox'
import EchartsBox from './EchartsBox'
import './ShowSettlement.css'
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
    <>
      <div className="reve-expend-title">收支统计</div>
      <div>
        <div>收入{income}</div>
        <div>支出{pay}</div>
        <div>总计{toal}</div>
      </div>
      <div className="add">
        {isShowAdd ?
          <div>
            <div onClick={closeIncome}>关闭</div>
          </div>
          :
          <Button onClick={addIncome}>添加新流水</Button> 
        }
        <Button onClick={lookDetail}>{isDetail ? '详情':'图表'}</Button> 
      </div>
      {isDetail ?
        EchartsBox
        :
        DetailBox
      }
    </>
  )
}
export default useSettlement
