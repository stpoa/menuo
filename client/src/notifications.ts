export const readSubscription = () =>
  JSON.parse(localStorage.getItem('subscription') || '0')
