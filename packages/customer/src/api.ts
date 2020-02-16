import axios, { AxiosRequestConfig } from 'axios'
import { getConfig } from './env'

const api = axios.create({ baseURL: getConfig().apiUrl })

type Get = <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>
type Post = <T = any, K = any>(
  url: string,
  data?: K,
  config?: AxiosRequestConfig,
) => Promise<T>
type Put = <T = any, K = any>(
  url: string,
  data?: K,
  config?: AxiosRequestConfig,
) => Promise<T>
type Del = <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>

export const get: Get = (url, config) =>
  api.get(url, config).then(response => response.data)

export const post: Post = (url, body, config) =>
  api.post(url, body, config).then(response => response.data)

export const put: Put = (url, data, config) =>
  api.put(url, data, config).then(response => response.data)

export const del: Del = (url, config) =>
  api.delete(url, config).then(response => response.data)

export function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending'
  let response: T

  const suspender = promise.then(
    res => {
      status = 'success'
      response = res
    },
    err => {
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

export const getStaticJSONData = (path: string) =>
  fetch('/menu/data/' + path).then(r => r.json())
