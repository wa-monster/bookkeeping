
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
  type?: number,
  incomeType?: string,
  isIncome?: boolean
}

declare interface totalObj {
  [key: string]: addFormObjType;
}

type allObjArr = totalObj[]

declare type vType = {
  [key: string]: string;
  [key: number]: string;
}
declare type obj = {
  [key: string]: any;
}