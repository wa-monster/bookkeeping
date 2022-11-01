// main.js


const { app, BrowserWindow, Tray, Menu,ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const isDev= require('electron-is-dev')
const fs = require('fs')
const {
  isExists,
  writeData,
  readData
} = require('./fileUntil')

let baseUrl 
if(isDev){
  baseUrl = '../public'
}else{
  baseUrl = '../build'
}
// 
function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      // devTools:false,
      webSecurity:false,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  })
  if(isDev){
    mainWindow.loadURL('http://localhost:3000/');
  }else{
    // 加载 index.html
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
  
  initAddBack(mainWindow)
  initData()
  initIpcMain()

}

async function initData(){
  const absPath = path.resolve(__dirname, '../../data');
  try {
      await fs.promises.stat(absPath)
  } catch (e) {
      // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
      await fs.promises.mkdir(absPath, {recursive: true})
  }
}
function initAddBack(mainWindow){
  let tray
  const iconPath = path.join(__dirname, `${baseUrl}/static/icon.png`)
  tray = new Tray(iconPath)      //实例化一个tray对象，构造函数的唯一参数是需要在托盘中显示的图标url  
  
  tray.setToolTip('资产统计')       //鼠标移到托盘中应用程序的图标上时，显示的文本
  
  tray.on('click', () => {       //点击图标的响应事件，这里是切换主窗口的显示和隐藏
    if(mainWindow.isVisible()){
      mainWindow.hide()
    }else{
      mainWindow.show()
    }
  })
  tray.on('right-click', () => {    //右键点击图标时，出现的菜单，通过Menu.buildFromTemplate定制，这里只包含退出程序的选项。
    const menuConfig = Menu.buildFromTemplate([
      {
        label: '退出',
        click: () => app.quit()
      }
    ])
    tray.popUpContextMenu(menuConfig)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })


})

function initIpcMain(){
  // 新增某月的某个选项的剩余
  ipcMain.on('addItem',async (event,str)=>{
    try {
      const obj = JSON.parse(str)
      const {date,type} = obj
      const timeyear = "" + date.split('-')[0]
      const url = path.join(__dirname, `../../data/${timeyear}.txt`)
      const isExistsErr = await isExists(url)
      let dataObj 
      if(isExistsErr){
        dataObj = addDataObj(obj,type,date)
      }else{
        const readRes = await readData(url)
        dataObj = addDataObj(obj,type,date,JSON.parse(readRes))
      }
      await writeData(url,JSON.stringify(dataObj))
      event.sender.send('sendAddItemRes','200');
    } catch (error) {
      event.sender.send('sendAddItemRes','500');
    }
  });
  // 拿到数据
  ipcMain.on('getAllByYear',async (event)=>{
    try {
      const url = path.join(__dirname, `../../data`)
      const files = fs.readdirSync(url), arr = [], txtArr = []
      files.forEach(file => { 
        if (path.extname(file) === ".txt") {
          const fileName = file.substring(0,file.indexOf('.'))
          arr.push(fileName)
        }
      })
      if(arr.length > 0){
        // 函数调多少个不确定
        const dataArr = await Promise.all(arr.map(v=>{
          let urlFile = path.join(__dirname, `../../data/${v}.txt`)
          return readData(urlFile)
        }))
        dataArr.forEach((obj,i)=>{txtArr.push({[arr[i]]:obj})})
        event.sender.send('sendGetDataRes',JSON.stringify(txtArr));
      }else{
        event.sender.send('sendGetDataRes',JSON.stringify([]));
      }
    } catch (error) {
      event.sender.send('sendGetDataRes','500');
    }
  })
  // 拿到最新的总数据
  ipcMain.on('getTotal',async (event,str)=>{
    try {
      const url = path.join(__dirname, `../../data`)
      const files = fs.readdirSync(url)
      let newDataName = 0
      files.forEach(file => { 
        if (path.extname(file) === ".txt") {
          const num = Number(file.substring(0,file.indexOf('.')))
          newDataName = num > newDataName ?  num : newDataName
        }
      })
      if(newDataName !== 0){
        const fileUrl = path.join(__dirname, `../../data/${newDataName}.txt`)
        const data = await readData(fileUrl)
        const dataObj = JSON.parse(data)
        let maxMonth = 0
        Object.keys(dataObj).forEach(key=>{
          const month = getMounth(key)
          maxMonth = maxMonth > month ? maxMonth : month
        })
        const monethDataKey = `${newDataName}-${maxMonth}`
        const lastDateData = dataObj[monethDataKey] ? dataObj[monethDataKey] : {}
        event.sender.send('sendGetTotalRes',JSON.stringify(lastDateData));
      }else{
        event.sender.send('sendGetTotalRes',JSON.stringify({}));
      }
    } catch (error) {
      event.sender.send('sendGetTotalRes','500');
    }
  })
  // 新增收入
  ipcMain.on('addIncomeItem',async (event,str)=>{
    try {
      const obj = JSON.parse(str)
      const {date,type} = obj
      const timeyear = "" + date.split('-')[0]
      const url = path.join(__dirname, `../../data/${timeyear}.txt`)
      const isExistsErr = await isExists(url)
      if(isExistsErr){
        const dataObj = addDataObj(obj,type,date)
        await writeData(url,JSON.stringify(dataObj), event,'sendAddIncomeItemRes')
      }else{
        const data = await readData(url,event,'sendAddIncomeItemRes')
        let dataObj = JSON.parse(data)
        dataObj = addDataObj(obj,'income',date,dataObj)
        await writeData(url,JSON.stringify(dataObj), event,'sendAddIncomeItemRes')
      }
      event.sender.send('sendAddIncomeItemRes','200');
    } catch (error) {
      event.sender.send('sendAddIncomeItemRes','500');
    }
  })

  ipcMain.on('getPreData',async (event,)=>{
    try {
      const urlFile = path.join(__dirname, `../../data/pre.txt`)
      const isExistsErr = await isExists(urlFile)
      if(!isExistsErr){
        const readRes = readData(urlFile)
        const data = JSON.parse(readRes)
        event.sender.send('sendPreData',JSON.stringify(data));
      }else{
        event.sender.send('sendPreData',JSON.stringify({}));
      }
    } catch (error) {
      event.sender.send('sendPreData','500');
    }
  })
}

function addDataObj(obj,type,date,dataObj){
  if(dataObj){
    if(dataObj[date]){
      dataObj[date][type] = obj
    }else{
      dataObj[date]={
        [type]:obj
      }
    }
    return dataObj
  }else{
    const dataObj = {
      [date]: {
        [type]:obj
      }
    }
    return dataObj
  }
}

function getMounth(month){
  const arr = month.split('-')
  if(arr[1]){
    return Number(arr[1])
  }else{
    return 0
  }
}