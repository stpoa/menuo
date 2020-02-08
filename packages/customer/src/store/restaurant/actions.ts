import { createStandardAction } from 'typesafe-actions'

export const restaurantGet = createStandardAction('RESTAURANT / GET')()

type Restaurant = string
export const restaurantSet = createStandardAction('RESTAURANT / SET')<
  Restaurant
>()
