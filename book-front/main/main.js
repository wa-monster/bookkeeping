// main.js


const { app, BrowserWindow, Tray, Menu,ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const isDev= require('electron-is-dev')
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
  ipcMain.on('hello',(event,str)=>{
    console.log('str',str);
  })
}

