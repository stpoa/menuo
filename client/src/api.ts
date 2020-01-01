import axios, { AxiosRequestConfig } from 'axios'
import { getConfig } from './env'

const api = axios.create({ baseURL: getConfig().apiUrl })

type Get = <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>
type Post = <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>
type Put = <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>

export const get: Get = (url, config) =>
  api.get(url, config).then(response => response.data)

export const post: Post = (url, config) =>
  api.post(url, config).then(response => response.data)

export const put: Put = (url, config) =>
  api.put(url, config).then(response => response.data)


export function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending'
  let response: T

  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    },
  )
  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw response
      default:
        return response
    }
  }

  return { read }
}
