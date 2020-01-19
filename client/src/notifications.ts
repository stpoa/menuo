export const readSubscription = () => {
  try {
    return JSON.parse(localStorage.getItem('subscription') || '0')
  } catch (e) {
    return
  }
}
