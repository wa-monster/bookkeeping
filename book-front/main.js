// main.js


const { app, BrowserWindow } = require('electron')
const path = require('path')
function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  })
  // 加载 index.html
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:3000/');
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
