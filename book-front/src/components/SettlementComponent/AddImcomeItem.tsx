import React,{ useState,FC } from 'react'
import { DatePicker,DatePickerProps , Form, InputNumber, Button, Input } from 'antd';
import moment from 'moment'
import { FormProps } from 'rc-field-form';
import  './AddItem.scss'

const AddImcomeItem:FC<AddIncomeItemType> = (props) =>{

  const [form] = Form.useForm();
  const onFinish:FormProps['onFinish'] = (values)=>{
    const formData = {
      ...values,
      isIncome:true,
    }
    formData.date = moment(formData.date).format('YYYY-MM');
    props.saveIncome(formData)
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString)=>{

  }

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
          incomeType:'工资'
        }}
      >
        <Form.Item name="date" label="日期">
          <DatePicker onChange={onChange} picker="month" format="YYYY-MM"/>
        </Form.Item>
        <Form.Item name="incomeType" label="类型">
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="money"
          label="进账"
          getValueFromEvent={(...args: any[]) => {
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

export default AddImcomeItem