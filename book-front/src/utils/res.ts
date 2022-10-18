import { message } from 'antd';
const resSuccess = () => {
  message.success('保存成功')
}
const resError = () => {
  message.error('保存失败，请重试');
}
export const initElectronRes = () => {
  window.saveData.sendAddItemRes((event: any, res: string) => {
    console.log('res', res);
    if ((+res) === 500) {
      resError()
    } else {
      resSuccess()
      window.addItemSuccess()
      window.addItemSuccess = null;
    }
  })
  // 主进程返回给react的数据
  window.getData.sendGetDataRes((event: any, res: any) => {
    if ((+res) === 500) {
      resError()
    } else {
      resSuccess()
      // 调用react 的函数
      window.getDataSuccess(res)
      window.getDataSuccess = null;
    }
  })
  // 最新的统计 主进程返回给react的数据
  window.getData.sendGetTotalRes((event: any, res: any) => {
    if ((+res) === 500) {
      resError()
    } else {
      // resSuccess()

      // 调用react 的函数
      window.getTotalSuccess(res)
      window.getDataSuccess = null;
    }
  })

}
