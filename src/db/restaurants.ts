import yaml from 'yaml-tag'

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

export const getMenu = (restaurantId: string) =>
  Promise.resolve(
    menus.find(menu => menu.restaurantId === restaurantId),
  )

export const menus: Menu[] = yaml`
- restaurantId: 'zalewajka'
  menu:
  - name: Zupy
    dishes:
    - name: Zalewajka
      variants:
      - price: 15
        description: Barley soup Cracow  
    - name: Barszcz czerwony z pierogami z mięsem
      variants:
      - price: 15
      description: Beetroot soup with dumplings with meat
  - name: Zupy
    dishes:
    - name: Zalewajka
      variants:
      - price: 15
        description: Barley soup Cracow  
    - name: Barszcz czerwony z pierogami z mięsem
      variants:
      - price: 15
      description: Beetroot soup with dumplings with meat
  - name: Sałatki
    dishes:
    - name: Sałatka z watróbką
      variants:
      - price: 29
        description: Wątróbka drobiowa,maliny, ser feta i dresing balsamiczny Lettuce with stewed chicken liver, feta cheese and raspberries
    - name: Sałatka z kurczakiem, kozim serem i pieczona papryką
      variants:
      - price: 30
      description: Lettuce with grilled chicken, goat cheese and roasted pepper

- restaurantId: 'zadupajka'
  menu:
  - name: Dupy
    dishes:
    - name: Zalewajka
      variants:
      - price: 15
        description: Barley soup Cracow  
    - name: Barszcz czerwony z pierogami z mięsem
      variants:
      - price: 15
      description: Beetroot soup with dumplings with meat
  - name: Zupy
    dishes:
    - name: Zalewajka
      variants:
      - price: 15
        description: Barley soup Cracow  
    - name: Barszcz czerwony z pierogami z mięsem
      variants:
      - price: 15
      description: Beetroot soup with dumplings with meat
  - name: Sałatki
    dishes:
    - name: Sałatka z watróbką
      variants:
      - price: 29
        description: Wątróbka drobiowa,maliny, ser feta i dresing balsamiczny Lettuce with stewed chicken liver, feta cheese and raspberries
    - name: Sałatka z kurczakiem, kozim serem i pieczona papryką
      variants:
      - price: 30
      description: Lettuce with grilled chicken, goat cheese and roasted pepper
`
