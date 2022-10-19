// const fs = require( 'fs');
// const path = require( 'path');
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('saveData', {
  addItem: (values) => ipcRenderer.send('addItem',values),
  addIncomeItem: (values) => ipcRenderer.send('addIncomeItem',values),
  sendAddItemRes:(callback)=>{ipcRenderer.on('sendAddItemRes',callback)},
  sendAddIncomeItemRes:(callback)=>{ipcRenderer.on('sendAddIncomeItemRes',callback)}
})
contextBridge.exposeInMainWorld('getData', {
  getAllByYear: (values) => ipcRenderer.send('getAllByYear',values),
  getTotal: (values) => ipcRenderer.send('getTotal',values),
  // 返回给react
  sendGetDataRes:(callback)=>{ipcRenderer.on('sendGetDataRes',callback)},
  sendGetTotalRes:(callback)=>{ipcRenderer.on('sendGetTotalRes',callback)}
})
