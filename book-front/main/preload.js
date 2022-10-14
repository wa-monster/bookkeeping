// const fs = require( 'fs');
// const path = require( 'path');
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('test', {
  hello: () => ipcRenderer.send('hello','222222222222222222222'),
})


// ipcMain.on('saveMoneyData', function(event, arg, url) {
//   // arg是从渲染进程返回来的数据
//   console.log('event',event);
//   console.log('arg',arg);
//   // fs.writeFile(path.join(__dirname, './money'),JSON.stringify(arg), "utf8", (err)=>{
//   //   // 通过event.sender.send给渲染进程传递数据
//   //   if(err){
//   //     event.sender.send('saveActionReply', "写入失败");
//   //   }else {
//   //     event.sender.send('saveActionReply', "写入成功");
//   //   }
//   // })
// });


// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector)
//     if (element) element.innerText = text
//   }

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type])
//   }
// })