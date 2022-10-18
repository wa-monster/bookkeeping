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

  initIpcMain()
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
  ipcMain.on('addItem',(event,str)=>{
    const obj = JSON.parse(str)
    const {date,type} = obj
    const timeyear = "" + date.split('-')[0]
    const url = path.join(__dirname, `/data/${timeyear}.txt`)
    isExists(url,(err)=>{
      if(err){
        console.log(err);
        const data = {
          [date]: {
            [type]:obj
          }
        }
        writeData(url,JSON.stringify(data), event,'sendAddItemRes').then(res=>{
          if(res === '成功'){
            event.sender.send('sendAddItemRes','200');
          }
        })
      }else{
        readData(url,event,'sendAddItemRes')
        .then(data=>{
          const dataObj = JSON.parse(data)
          dataObj[date][type] = obj
          writeData(url,JSON.stringify(dataObj), event,'sendAddItemRes').then(res=>{
            if(res === '成功'){
              event.sender.send('sendAddItemRes','200');
            }
          })
        })
      }
    })
  });
  // 拿到数据
  ipcMain.on('getAllByYear',(event,str)=>{
    const url = path.join(__dirname, `/data/${str}.txt`)
    readData(url,event,'sendGetDataRes')
    .then(data=>{
      const dataObj = JSON.parse(data)
      var arr = Object.keys(dataObj).map(key=>{
        return dataObj[key]
      })
      event.sender.send('sendGetDataRes',JSON.stringify(arr));
    })
  })
  // 拿到数据
  ipcMain.on('getAllByYear',(event,str)=>{
    const url = path.join(__dirname, `/data/${str}.txt`)
    readData(url,event,'sendGetDataRes')
    .then(data=>{
      const dataObj = JSON.parse(data)
      var arr = Object.keys(dataObj).map(key=>{
        return dataObj[key]
      })
      event.sender.send('sendGetDataRes',JSON.stringify(arr));
    })
  })
  // 拿到最新的总数据
  ipcMain.on('getTotal',(event,str)=>{
    const url = path.join(__dirname, `/data`)
    const files = fs.readdirSync(url)
    let newDataName = 0
    files.forEach(file => { 
      if (path.extname(file) === ".txt") {
        const num = Number(file.substring(0,file.indexOf('.')))
        newDataName = num > newDataName ?  num : newDataName
      }
    })
    const fileUrl = path.join(__dirname, `/data/${newDataName}.txt`)
    readData(fileUrl,event,'sendGetTotalRes')
    .then(data=>{
      const dataObj = JSON.parse(data)
      var arr = Object.keys(dataObj).map(key=>{
        return dataObj[key]
      })
      event.sender.send('sendGetTotalRes',JSON.stringify(arr));
    })
  })
}

