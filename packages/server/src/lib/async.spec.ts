import { promiseSequence } from './async'

describe('Async', () => {
  test('Promise sequence', async () => {
    const promises = [1, 2, 3].map(v => Promise.resolve(v))
    const result = await promiseSequence(promises)
    expect(result).toEqual([1, 2, 3])
  })
})
