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