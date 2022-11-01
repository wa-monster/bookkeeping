
// 给window对象加electron暴露出来的一些api
declare interface Window {
  addItemSuccess: any;
  getDataSuccess: any;
  getTotalSuccess: any;
  addIncomeItemSuccess: any;
  getPreDataSuccess: any;
  saveData: {
    addItem: any,
    addIncomeItem: any,

    sendAddItemRes: any,
    sendAddIncomeItemRes: any
  },
  getData: {
    getTotal: any,
    sendGetTotalRes: any,
    getAllByYear: any,
    sendGetDataRes: any,
    getPreData: any,
    sendPreData: any,
  },
  [key: string]: any
}

declare interface ShowSettlementType {
  keyIndex: number
}

declare interface AddItemType {
  saveTotal: (addFormObjType) => void
}

declare interface AddIncomeItemType {
  saveIncome: (addFormObjType) => void
}
declare interface addFormObjType {
  date: string,
  money: number,
  type?: typeNum,
  incomeType?: string,
  isIncome?: boolean
}

declare type totalObj = Record<string, addFormObjType>

type allObjArr = totalObj[]

declare type vType = {
  [key: string]: string;
  [key: number]: string;
}
declare type obj = {
  [key: string]: any;
}

type toPropString<T> = {
  [key in keyof T]: string;
}

/** 一个双层对象 第一层为对象第二层是数字或者字符串 */
/**
 * {
 *  '2022':{
 *  '2022-10'：{
 *    '1'：{
 *      date:'',
 *    }
 *    }
 *  }
 * }
 * 
 * */
declare type listObj = Record<string | number, Record<string, Record<string, addFormObjType>>>

declare type objByStr = Record<string, string>

declare type typeNum = 1 | 2 | 3 | 4 | 5 | 6

type moneyType = 'zfb' | 'wx' | 'zsyh' | 'xq' | 'jj' | 'jq'

interface tableType {
  date: string;
  key: string;
  income: number;
  total: number;
  zfb: number;
  wx: number;
  zsyh: number;
  xq: number;
  jj: number;
  jq: number;
}