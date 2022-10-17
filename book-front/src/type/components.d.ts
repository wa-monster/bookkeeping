// 给window对象加electron暴露出来的一些api
declare interface Window {
  addItemSuccess: any;
  getDataSuccess: any;
  getTotalSuccess: any;
  saveData: {
    addItem: any,
    sendAddItemRes: any
  },
  getData: {
    getTotal: any,
    getAllByYear: any,
    sendGetDataRes: any,
    sendGetTotalRes: any,
  },
}

declare interface ShowSettlementType {
  keyIndex: number
}

declare interface AddItemType {
  saveIncome: (addFormObjType) => void
}
declare interface addFormObjType {
  date: String,
  money: Number
  type: Number
}