import React,{useState,FC,useEffect} from 'react'
import myContext from 'src/utils/context'
import { Table } from 'antd';
import {doParseList} from 'src/utils/filter'
const DetailList:FC<ShowSettlementType> = (props)=>{

  const {List,getList} = React.useContext(myContext)
  const [dataSource,setDataSource] = useState<tableType[]>([])
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '收入',
      dataIndex: 'income',
      key: 'income',
    },
    {
      title: '当前资产',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '支付宝',
      dataIndex: 'zfb',
      key: 'zfb',
    },
    {
      title: '微信',
      dataIndex: 'wx',
      key: 'wx',
    },
    {
      title: '招商银行',
      dataIndex: 'zsyh',
      key: 'zsyh',
    },
    {
      title: '现钱',
      dataIndex: 'xq',
      key: 'xq',
    },
    {
      title: '基金',
      dataIndex: 'jj',
      key: 'jj',
    },
    {
      title: '借钱',
      dataIndex: 'jq',
      key: 'jq',
    },
  ]
  const moneyTpyeMap:Map<typeNum,moneyType> = new Map(
    [
      [1,'zfb'],
      [2,'wx'],
      [3,'zsyh'],
      [4,'xq'],
      [5,'jj'],
      [6,'jq'],
    ]
  )
  const getTable = (List:any[])=>{
    const listObj:listObj= doParseList(List)
    const arr:tableType[] = []
    Object.keys(listObj).forEach(key=>{
      Object.keys(listObj[key]).forEach(key2=>{
        let obj:tableType = {
          date:key2,
          key:key2,
          income:0,
          total:0,
          zfb:0,
          wx:0,
          zsyh:0,
          xq:0,
          jj:0,
          jq:0,
        }
        Object.keys(listObj[key][key2]).forEach(key3=>{
          if(listObj[key][key2][key3].isIncome === true){
            obj['income'] = listObj[key][key2][key3].money
          }else{
            const tpye= listObj[key][key2][key3].type
            if(tpye !== undefined){
              const objProperty =  moneyTpyeMap.get(tpye) as moneyType
              obj[objProperty] = listObj[key][key2][key3].money
            }
          }
        })
        const tableColumn = {
          ...obj,
        }
        const sum = ([...moneyTpyeMap.values()]).reduce<number>((pre,cur:moneyType)=>{
          return pre + (tableColumn[cur as moneyType])
        },0)
        tableColumn.total = sum
        arr.push(tableColumn)
      })
    })
    return   arr
  }

  useEffect(()=>{
    const listObj = getTable(List)
    console.log('listObj',listObj);
    setDataSource(listObj)
  },[List])
  return (
    <div>
      <Table<tableType> dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default DetailList