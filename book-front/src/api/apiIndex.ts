import axios, { AxiosPromise } from 'axios'
const baseURL = "localhost:3000"
interface getInfoType {
  type:string;
}
function getInfo (data:getInfoType):AxiosPromise<any>{
  return axios({
    method: 'post',
    url: baseURL + '/getInfo',
    data
  })
}
