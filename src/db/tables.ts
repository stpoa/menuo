export const getTables = (restaurantId: string) => Promise.resolve(tables)

const tables = [
  {
    id: '1',
    status: 'empty',
    orders: [
      {
        id: '2',
        tableId: '1',
        userId: 0,
        items: [
          {
            dish: {
              id: '2',
              name: 'Barszcz czerwony z pierogami z mięsem',
              variants: [
                {
                  price: 15,
                },
              ],
              description: 'Beetroot soup with dumplings with meat',
            },
            variant: {
              price: 15,
            },
            count: 1,
            itemId: 0,
            isDone: false,
          },
          {
            dish: {
              id: '3',
              name: 'Grzybowa',
              variants: [
                {
                  price: 17,
                },
              ],
              description: 'Mushroom soup',
            },
            variant: {
              price: 17,
            },
            count: 1,
            itemId: 1,
            isDone: false,
          },
        ],
        status: 'new',
      },
    ],
  },
  {
    id: '2',
    status: 'empty',
    orders: [],
  },
  {
    id: '3',
    status: 'empty',
    orders: [],
  },
  {
    id: '4',
    status: 'empty',
    orders: [],
  },
  {
    id: '5',
    status: 'empty',
    orders: [],
  },
  {
    id: '6',
    status: 'empty',
    orders: [],
  },
  {
    id: '7',
    status: 'empty',
    orders: [],
  },
  {
    id: '8',
    status: 'empty',
    orders: [],
  },
  {
    id: '9',
    status: 'empty',
    orders: [],
  },
  {
    id: '10',
    status: 'empty',
    orders: [],
  },
]
