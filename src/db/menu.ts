export interface Menu {
  restaurantId: string
  menu: {
    name: string
    dishes: Dish[]
  }
}

interface Dish {
  name: string
  variants: Variant[]
}

interface Variant {
  price: number
  description: string
}
