import axios from 'axios'

export function request(config) {
  return new Promise((reslove, reject) => {
    // 1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://localhost/',
      timeout: 5000
    })

    //发送网络请求
    return instance(config)
    // instance(config)
    //   .then(res => {
    //     reslove(res)
    //   })
    //   .catch(err => {
    //     reject(err)
    //   })
  })
}