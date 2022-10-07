import React,{ useState,FC } from 'react'
import { AddItemType } from '@/type/components'
import { Select , Form, InputNumber, Button } from 'antd';
import  './AddItem.scss'
const AddItem:FC<AddItemType> = (props)=>{
  const [form] = Form.useForm();
  const moneyOption =[
    {
      label:'餐饮',
      value:1
    },
    {
      label:'住宿',
      value:2
    },
    {
      label:'游戏',
      value:3
    },
  ]
  const { Option } = Select;
  const optionChildren:React.ReactNode[] = []
  moneyOption.forEach(v=>{
    optionChildren.push(<Option value={v.value} key={v.value}>{v.label}</Option>) 
  })
  const onFinish = ()=>{
    props.closeIncome()
  }
  return (
    <Form className='add-form' form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item label="类型">
            <Select
              style={{ width: 120 }}
            >
              {optionChildren}
            </Select>
          </Form.Item>
          <Form.Item
            name="money"
            label="数目"
          >
            <InputNumber prefix="￥" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
  )
}
export default AddItem