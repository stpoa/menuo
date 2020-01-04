import { nestOrdersTables } from './orders'

test('shit', () => {
  expect(nestOrdersTables([[], []])).toEqual({});
});

