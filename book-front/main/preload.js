import { ipcMain } from 'electron';
import fs from 'fs'
import path from 'path'
ipcMain.on('saveMoneyData', function(event, arg, url) {
  // arg是从渲染进程返回来的数据
  fs.writeFile(path.join(__dirname, url),JSON.stringify(arg), "utf8", (err)=>{
    // 通过event.sender.send给渲染进程传递数据
    if(err){
      event.sender.send('saveActionReply', "写入失败");
    }else {
      event.sender.send('saveActionReply', "写入成功");
    }
  })
});


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})