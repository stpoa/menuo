export const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

export const promiseSequence = async <T>(promises: Promise<T>[]): Promise<T[]> => {
  const results = []
  for(let i = 0; i < promises.length; ++i) {
    results[i] = await promises[i];
  }
  return results
};
