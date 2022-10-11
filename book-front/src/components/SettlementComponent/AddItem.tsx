import React,{ useState,FC } from 'react'
import { DatePicker,DatePickerProps , Form, InputNumber, Button, Select } from 'antd';
import moment from 'moment'
import  './AddItem.scss'
import { FormProps } from 'rc-field-form';
const AddItem:FC<AddItemType> = (props)=>{
  const [form] = Form.useForm();
  const onFinish:FormProps['onFinish'] = (values)=>{
    console.log('form',values);
    
    props.saveIncome(values)
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString)=>{

  }
  const moneyOption =[
    {
      label:'支付宝',
      value:1
    },
    {
      label:'微信',
      value:2
    },
    {
      label:'招商银行',
      value:3
    },
    {
      label:'现钱',
      value:4
    },
    {
      label:'基金',
      value:5
    }
  ]
  const { Option } = Select;
  const optionChildren:React.ReactNode[] = []
  moneyOption.forEach(v=>{
    optionChildren.push(<Option value={v.value} key={v.value}>{v.label}</Option>) 
  })
  return (
    <div className='add-form-box'>
      <Form 
        className='add-form' 
        form={form} 
        name="horizontal_login" 
        onFinish={onFinish}
        initialValues={{
          date:moment(moment(),'YYYY-MM'),
          money:0,
          type:1
        }}
      >
        <Form.Item name="date" label="日期">
          <DatePicker onChange={onChange} picker="month" format="YYYY-MM"/>
        </Form.Item>
        <Form.Item name="type" label="类型">
          <Select  style={{ width: 200 }}>
            { optionChildren }
          </Select>
        </Form.Item>
        <Form.Item
          name="money"
          label="余额"
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
    </div>

  )
}
export default AddItem