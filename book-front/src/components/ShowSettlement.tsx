import React,{useState,FC,useEffect} from 'react'
import { Button,DatePicker,DatePickerProps } from 'antd';
import DetailBox from './SettlementComponent/DetailBox'
import EchartsBox from './SettlementComponent/EchartsBox'
import AddItem from './SettlementComponent/AddItem'
import './ShowSettlement.scss'
import moment from 'moment'
import {money} from '../utils/filter'
const useSettlement:FC<ShowSettlementType> = (props)=>{
  const [income,setIncome] = useState(0)
  const [pay,setPay] = useState(0)
  const [total,setTotal] = useState(0)
  // 
  const [isShowAdd,setIsShowAdd] = useState(false)
  const addIncome = ()=>{
    setIsShowAdd(true)
  } 
  const closeIncome = ()=>{
    setIsShowAdd(false)
  }
  const saveIncome = (values:addFormObjType) => {
    window.saveData.addItem(JSON.stringify(values));
    window.addItemSuccess = ()=> {
      getTotal()
      closeIncome()
    }
  }
  // 
  // const [isDetail,setDetail] = useState(false)
  // const lookDetail = ()=>{
  //   setDetail(!isDetail)
  // }

  // const [listDateStr,setListDate] = useState(moment().format('YYYY'))
  const getTotal = ()=>{
    window.getData.getTotal();
    // 拿到数据回调
    window.getTotalSuccess = (res:any)=> {
      
    }
  }
  useEffect(() => {
  }, [])
  
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
          <div>{money(total)}</div>
        </div>
      </div>
      {/* <div style={{"margin":"20px 0"}}>
        <DatePicker 
          defaultValue={moment()}
          onChange={(...[,dataString]:[value: moment.Moment | null, dateString: string])=>setListDate(dataString)} 
          picker="year" 
        />
      </div> */}
      <div className="add">
        {isShowAdd ?
          <Button onClick={closeIncome}>关闭</Button>
          :
          <Button onClick={addIncome}>新增</Button> 
        }
      </div>
      {isShowAdd ?
        <AddItem saveIncome={saveIncome}></AddItem>
        :
        null
      }
      {/* <Button onClick={lookDetail}>{isDetail ? '详情':'图表'}</Button> 
      {isDetail ?
        <EchartsBox></EchartsBox>
        :
        <DetailBox></DetailBox>
      } */}
    </div>
  )
}
export default useSettlement
