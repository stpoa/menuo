export const getLanguageFromBrowser = () => {
  const language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    ((navigator as any) as { userLanguage: string }).userLanguage

  return language.toLowerCase().split(/[_-]+/)[0]
}

export const getTranslations = () => ({
  callWaiter: ['Call a waiter', 'Przywołaj kelnera'],
  order: ['Order', 'Zamów'],
  searchPlaceholderContent: [
    'Search for dishes, descriptions and categories',
    'Wyszukaj dania, opisy lub kategorie',
  ],
  homePageUrlContent: ['https://menuo.app/en', 'https://menuo.app'],
  aboutUs: ['About us', 'O nas'],
  callWaiterAim: [
    'What do You want to call the waiter for?',
    'W jakim celu chcesz przywołać kelnera?',
  ],
  readOnlyMenuDialogTitle: ['Read only menu', 'Menu w trybie odczytu'],
  readOnlyMenuDialogContent: [
    "This menu currently works only in read mode. You can't place orders with it. This restriction results from the plan used by this restaurant. You can order with MENUO in many other restaurants.",
    'To menu działa aktualnie tylko w trybie odczytu. Nie możesz za jego pomocą składać zamówień. Ograniczenie to wynika z planu z którego korzysta restauracja. Możesz zamówić z MENUO we wielu innych restauracjach.',
  ],
  payInCash: ['Pay in cash', 'Płatność gotówką'],
  payByCard: ['Pay by card', 'Płatność kartą'],
  other: ['Other', 'Inne'],
  orderConfirmContent: [
    'Do you want to order entries below?',
    'Czy chcesz zamówić poniższe?',
  ],
  orderListContent: ['The list of Your orders:', 'Lista Twoich zamówień:'],
  back: ['back', 'powrót'],
  orderSentTitleContent: ['Order sent', 'Zamówienie wysłane!'],
  orderSentSubTitleContent: [
    'Your order has been sent',
    'Twoje zamówienie zostało wysłane!',
  ],
  orderSentContent: [
    'Remember that at any time you can make another order or call a waiter. Already ordered dishes can be seen by clicking an icon in the upper right corner.',
    'Pamiętaj, że w każdej chwili możesz złożyć kolejne zamówienie lub zawołać kelnera. Zamówione wcześniej dania możesz sprawdzić klikając ikonke w prawym, górnym rogu.',
  ],
  currentlyInBasket: ['Currently in basket', 'Aktualnie w koszyku'],
  callWaiterConfirmation: [
    'Waiter has been notified - ',
    'Kelner został powiadomiony - ',
  ],
  cashPayment: ['cash payment!', 'płatność gotówką!'],
  cardPayment: ['card payment!', 'płatność kartą!'],
  anotherNeed: ['another need!', 'inna potrzeba!'],

  // TODO: Below temporary translating only for W-Z company to test MENUO as another app, remove it after
  askForContact: ['Contact', 'Kontakt'],
  contactWayConfirmation: ['Contact data below:', 'Dane kontaktowe poniżej:'],
  orderSentContentWz: [
    'If You have any further questions please use "CONTACT" button.',
    'Jeśli masz jakieś dalsze pytania użyj przycisku "KONTAKT".',
  ],
})
