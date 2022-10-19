import { message } from 'antd';
const saveResSuccess = () => {
  message.success('保存成功')
}
const saveResError = () => {
  message.error('保存失败，请重试');
}

const getResSuccess = () => {
  message.success('获取成功')
}
const getResError = () => {
  message.error('获取失败，请重试');
}

export const initElectronRes = () => {
  window.saveData.sendAddItemRes((event: any, res: string) => {
    if ((+res) === 500) {
      saveResError()
    } else {
      saveResSuccess()
      window.addItemSuccess()
      window.addItemSuccess = null;
    }
  })
  // 主进程返回给react的数据
  window.getData.sendGetDataRes((event: any, res: any) => {
    if ((+res) === 500) {
      getResError()
    } else {
      // 调用react 的函数
      const data = JSON.parse(res)
      window.getDataSuccess(data)
      window.getDataSuccess = null;
    }
  })
  // 最新的统计 主进程返回给react的数据
  window.getData.sendGetTotalRes((event: any, res: any) => {
    if ((+res) === 500) {
      getResError()
    } else {
      // resSuccess()
      const data = JSON.parse(res)
      // 调用react 的函数
      window.getTotalSuccess(data)
      window.getTotalSuccess = null;
    }
  })
  //保存收入
  window.saveData.sendAddIncomeItemRes((event: any, res: any) => {
    if ((+res) === 500) {
      saveResError()
    } else {
      saveResSuccess()
      const data = JSON.parse(res)
      // 调用react 的函数
      window.getTotalSuccess(data)
      window.getTotalSuccess = null;
    }
  })
  // 
  window.getData.sendPreData((event: any, res: any) => {
    if ((+res) === 500) {
      getResError()
    } else {
      // resSuccess()
      const data = JSON.parse(res)
      // 调用react 的函数
      window.getPreDataSuccess(data)
      window.getPreDataSuccess = null;
    }
  })
}


