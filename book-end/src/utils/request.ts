import axios, { Method } from 'axios';
import { getConfig } from '@/utils';
const { FEISHU_CONFIG: { FEISHU_URL } } = getConfig();

/**
 * @description: 任意请求
*/
const request = async ({ url, option = {} }) => {
  try {
    return axios.request({
      url,
      ...option
    })
  } catch (error) {
    throw (error)
  }
}

interface IMethodV {
  url: string;
  method?: Method;
  headers?: { [key in string]: string };
  params?: Record<string, any>;
  query?: Record<string, unknown>;
}
export interface IRequest {
  data: any;
  code: number;
}

const methodV = async ({
  url,
  method,
  headers,
  params = {},
  query = {},
}: IMethodV): Promise<IRequest> => {
  let sendUrl = '';
  if (/^(http:\/\/|https:\/\/)/.test(url)) {
    sendUrl = url
  } else {
    sendUrl = `${FEISHU_URL}${url}`
  }
  try {
    return new Promise<IRequest>((resolve, reject) => {
      axios({
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          ...headers
        },
        url: sendUrl,
        method,
        params: query,
        data: {
          ...params
        }
      }).then(({ data, status }) => {
        return resolve({ data, code: status })
      }).catch((err) => {
        return reject(err)
      })
    })
  } catch (error) {
    throw error
  }
}

export { request, methodV }