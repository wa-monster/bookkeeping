import React,{ useState,FC } from 'react'
import { AddItemType } from '@/type/components'
import { DatePicker,DatePickerProps , Form, InputNumber, Button } from 'antd';
import moment from 'moment'
import  './AddItem.scss'
const AddItem:FC<AddItemType> = (props)=>{
  const [form] = Form.useForm();
  const onFinish = ()=>{
    props.closeIncome()
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString)=>{

  }
  return (
    <Form 
      className='add-form' 
      form={form} 
      name="horizontal_login" 
      layout="inline" 
      onFinish={onFinish}
      initialValues={{
        date:moment('2022-05','YYYY-MM'),
        money:0
      }}
    >
          <Form.Item name="date" label="日期">
            <DatePicker onChange={onChange} picker="month" format="YYYY-MM"/>
          </Form.Item>
          <Form.Item
            name="money"
            label="数目"
            getValueFromEvent={(...args: any[]) => {
              console.log(args);
              if(!args[0]){
                return 0
              }else{
                return +(''+args[0]).replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两位小数
              }
            }}
          >
            <InputNumber
              prefix="￥" 
              style={{ width: '100%' }} 
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
  )
}
export default AddItem