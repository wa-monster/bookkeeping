const fs = require('fs')

const isExists = (url,callback)=>{
  fs.access(url, fs.constants.F_OK, err => {
    callback(err)
  })
}
const writeData = (url,data,event,targetFn)=>{
  return new Promise((res,rej)=>{
    fs.writeFile(url,data,(error)=>{
      if(error){
        if(targetFn){
        event.sender.send(targetFn,'500')
        }
        rej(error)
        return false;
      }
      res('成功')
    })
  })
}
const readData = (url,event,targetFn)=>{
  return new Promise((res,rej)=>{
    fs.readFile(url, 'utf8', (err, data) => {
      // 读取成功 err为null
      // 读取失败 err为错误对象
      if (err){
        console.log(err);
        if(targetFn){
         event.sender.send(targetFn,'500')
        }
        rej(err) 
      }
      res(data)
    })
  })
}

module.exports = {
  isExists,
  writeData,
  readData
}