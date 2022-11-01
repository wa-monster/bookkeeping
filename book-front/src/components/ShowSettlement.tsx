import React,{useState,FC,useEffect} from 'react'
import { Button,DatePicker,DatePickerProps } from 'antd';
import AddItem from './SettlementComponent/AddItem'
import AddIncomeItem from './SettlementComponent/AddImcomeItem'
import './ShowSettlement.scss'
import moment from 'moment'
import {money} from '../utils/filter'
import myContext from 'src/utils/context'
import {doParseList} from 'src/utils/filter'
const ShowSettlement:FC<ShowSettlementType> = (props)=>{
  const {List,getList} = React.useContext(myContext)
  
  const [income,setIncome] = useState(0)
  const [preTotal,setPreTotal] = useState(0)
  const [total,setTotal] = useState(0)
  const [month] = useState(moment().format('YYYY-MM'))
  // 
  const [isShowAdd,setIsShowAdd] = useState(false)
  const  saveTotal= (values:addFormObjType) => {
    window.addItemSuccess = ()=> {
      getTotal()
      getList()
      setIsShowAdd(false)
    }
    window.saveData.addItem(JSON.stringify(values));

  }

  const [isCurrentReceipt,setCurrentReceipt] = useState(false)
  const saveIncome = (values:addFormObjType)=>{
    window.addIncomeItemSuccess = ()=> {
      getTotal()
      setCurrentReceipt(false)
    }
    window.saveData.addIncomeItem(JSON.stringify(values));
  }

  // 
  // const [isDetail,setDetail] = useState(false)
  // const lookDetail = ()=>{
  //   setDetail(!isDetail)
  // }
  const getTotal = ()=>{
    // 拿到数据回调
    window.getTotalSuccess = (res:totalObj)=> {
      const incomeObj:addFormObjType = res['income']
      delete res['income']
      const sum = Object.keys(res).map(key=>{
        return res[key]
      }).reduce((pre:number,cre:any)=>{
        console.log('pre',pre);
        
        return pre+cre.money
      },0)
      setTotal(sum > 0 ? sum : 0)
      console.log('incomeObj',incomeObj);
      
      setIncome(incomeObj ? incomeObj.money : 0)
    }
    window.getData.getTotal();

  }

  const getPreData = (List:any)=>{
    const listObj:listObj= doParseList(List)
    let preTotal = 0
    let lastNum = searchNewTimeTotal(listObj)
    const cloneListObj = JSON.parse(JSON.stringify(listObj))
    const cloneListObjY = cloneListObj[lastNum.maxY]
    if(cloneListObjY&&cloneListObjY[lastNum.lastDate]){
      delete cloneListObjY[lastNum.lastDate]
      const preNum = searchNewTimeTotal(cloneListObj)
      if(preNum.maxY === 0){
        return 
      }
      const preObj = cloneListObj[preNum.maxY][preNum.lastDate]
      console.log(preNum.lastDate);
      console.log(cloneListObj[preNum.maxY]);
      
      console.log('preObj',preObj);
      
      Object.keys(preObj).forEach(key=>{
        preTotal += preObj[key].money
      })
    }
    setPreTotal(preTotal)
  }
  const searchNewTimeTotal = (obj:obj)=>{
    let maxY = 0
    Object.keys(obj).forEach(key=>{
      if(Object.keys(obj[key]).length){
        if(maxY === 0){
          maxY = Number(key)
        }else{
          maxY = maxY > Number(key)?maxY : Number(key)
        }
      }
    })
    const objYear = obj[''+maxY] ?? []
    let mMax = 0
    Object.keys(objYear).forEach(key=>{
      const m = key.split('-')[1]
      if(objYear[key]){
        if(mMax === 0){
          mMax = Number(m) 
        }else{
          mMax = mMax > Number(m) ? mMax : Number(m)
        }
      }
    })
    const lastDate  = maxY+'-'+ (mMax>=10?mMax:'0'+mMax)
    return {
      lastDate,
      maxY,
      mMax
    }
  }
  useEffect(() => {
    getTotal()
  }, [])
  useEffect(()=>{
    getPreData(List)
  },[List])
  return (
    <div className="show-settlement">
      <div className="reve-expend-title">统计</div>
      <div className='reve-expend-content'>
        <div className='reve-expend-content-item'>
          <div>{month}月份收入总计 </div> 
          <div className='income'>{money(income)}</div>
        </div>
        <div className='reve-expend-content-item'>
          <div>上次资产总计</div> 
          <div className='preTotal'>{money(preTotal)}</div>
        </div>
        <div className='reve-expend-content-item'>
          <div>{month}资产总计</div> 
          <div>{money(total)}</div> 
        </div> 
      </div>
      <div className="add">
        {isShowAdd ?
          <Button onClick={()=>setIsShowAdd(false)}>关闭</Button>
          :
          <Button onClick={()=>setIsShowAdd(true)}>统计当前资产</Button> 
        }
      </div>
      {isShowAdd ?
        <AddItem saveTotal={saveTotal}></AddItem>
        :
        null
      }
      <div className="add">
        {isCurrentReceipt ?
          <Button onClick={()=>setCurrentReceipt(false)}>关闭</Button>
          :
          <Button onClick={()=>setCurrentReceipt(true)}>目前进账</Button> 
        }
      </div>
      {isCurrentReceipt?
        <AddIncomeItem saveIncome={saveIncome}></AddIncomeItem>
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
export default ShowSettlement
