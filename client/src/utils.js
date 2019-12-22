export const getSubscription = async publicVapidKey => {
  const registration = await navigator.serviceWorker.ready

  return registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  }).catch(console.log)
}

export function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const publicVapidKey =
  'BBQX6AVa35z3F76tJCGEIFQcm_kv1SHNbn2HeXnr_flxzIX6dChTCfL5I7oSKcVRdAyJlbH-bOxuuUxRg5oqtLY'

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported in this browser')
  }

  navigator.serviceWorker.register('/sw.js', { scope: '/' })

  return navigator.serviceWorker.ready
}

export function useQuery(search) {
  return new URLSearchParams(search);
}

export const waitForDocumentLoad = () =>
  new Promise(res => {
    window.onload = event => {
      res(event)
    }
  })

export const wait = (time) =>
  new Promise(res => {
    window.setTimeout(() => {
      res()
    }, time)
  })

