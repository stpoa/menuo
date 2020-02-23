export const getLanguageFromBrowser = () => {
  const language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    ((navigator as any) as { userLanguage: string }).userLanguage

  return language.toLowerCase().split(/[_-]+/)[0]
}
