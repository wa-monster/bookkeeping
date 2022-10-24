const fs = require('fs')

// 
const isExists = (url)=>{
  return new Promise((res)=>{
    fs.access(url, fs.constants.F_OK, err => {
      if(err){
        res(err)
      }else{
        res()
      }
    })
  })
}
const writeData = (url,data)=>{
  return new Promise((res,rej)=>{
    fs.writeFile(url,data,(err)=>{
      if(err){
        rej({isError:200,err})
      }else{
        res()
      }
    })
  })
}
const readData = (url)=>{
  return new Promise((res,rej)=>{
    fs.readFile(url, 'utf8', (err, data) => {
      // 读取成功 err为null
      // 读取失败 err为错误对象
      if (err){
        rej({isError:200,err}) 
      }else{
        res(data)
      }
    })
  })
}
module.exports = {
  isExists,
  writeData,
  readData
}