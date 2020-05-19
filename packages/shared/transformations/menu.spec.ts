import { normalizeMenu } from './menu'
import { IMenu } from '../interfaces'

describe('Menu', () => {
  const menu: IMenu = [
    {
      name: 'Zupy',
      dishes: [
        {
          name: 'Zalewajka',
          variants: [
            {
              price: 15,
            },
          ],
          description: 'Barley soup Cracow style',
        },
        {
          name: 'Barszcz czerwony z pierogami z mięsem',
          variants: [
            {
              price: 15,
            },
          ],
          description: 'Beetroot soup with dumplings with meat',
        },
        {
          name: 'Grzybowa',
          variants: [
            {
              price: 17,
            },
          ],
          description: 'Mushroom soup',
        },
      ],
    },
    {
      name: 'Sałatki',
      dishes: [
        {
          name: 'Sałatka z watróbką',
          variants: [
            {
              price: 29,
            },
          ],
          description:
            'Wątróbka drobiowa,maliny, ser feta i dresing balsamiczny Lettuce with stewed chicken liver, feta cheese and raspberries',
        },
        {
          name: 'Sałatka z kurczakiem, kozim serem i pieczona papryką',
          variants: [
            {
              price: 30,
            },
          ],
          description:
            'Lettuce with grilled chicken, goat cheese and roasted pepper',
        },
      ],
    },
    {
      name: 'Dania główne',
      dishes: [
        {
          name: 'Pierogi z kapustą i grzybami',
          variants: [
            {
              price: 28,
            },
          ],
          description: 'Polish dumplings with stewed sauerkraut and mushrooms',
        },
        {
          name: 'Placki ziemniaczane z gulaszem z dzika',
          variants: [
            {
              price: 35,
            },
          ],
          description: 'Potato pancakes served with wild boar goulash',
        },
        {
          name: 'Placki ziemniaczane z sosem borowikowym',
          variants: [
            {
              price: 30,
            },
          ],
          description: 'Potato pancakes served with porcini mushroom sauce',
        },
        {
          name:
            'Pierś kurczaka faszerowana szpinakiem i serem feta z sosem z suszonych pomidorów, ziemniaki i grillowanymi warzywami',
          variants: [
            {
              price: 38,
            },
          ],
          description:
            'Stuffed chicken breast with spinach and feta cheese served with sun dried tomato sauce, potatoes and grilled vegetables',
        },
        {
          name:
            'Tradycyjny kotlet schabowy podawany z ziemniakami i kapustą zasmażaną',
          variants: [
            {
              price: 37,
            },
          ],
          description:
            'Traditional breaded pork chop served with potatoes and fried cabbage',
        },
        {
          name:
            'Pstrąg z Doliny Kluczwody pieczony z masłem czosnkowym, pieczone ziemniaki i miks sałat',
          variants: [
            {
              price: 39,
            },
          ],
          description:
            'Roasted local trout with garlic butter, served with baked potatoes and mix of lettuce',
        },
        {
          name: 'Pierogi z cielęciną podawane z sosem borowikowym',
          variants: [
            {
              price: 33,
            },
          ],
          description:
            'Polish dumplings with minced veal served with porcini mushroom sauce',
        },
        {
          name: 'Pierogi chłopskie z ziemniakami, serem i boczkiem',
          variants: [
            {
              price: 38,
            },
          ],
          description: 'Dumplings with potatoes, cottage cheese and bacon',
        },
        {
          name:
            'Policzki wołowe w sosie winno - czekoladowym podawane z gorczycowym puree ziemniaczanym oraz jarmużem z piklowanym chilli',
          variants: [
            {
              price: 45,
            },
          ],
          description:
            'Beef cheeks in wine - chocolatr sauce served on potato and mustard seed puree, kale with pickled chilli peppers',
        },
        {
          name:
            'Żeberka wieprzowe pieczone w piwie i miodzie podawane z ziemniaczanym puree, kapusta zasmażana',
          variants: [
            {
              price: 39,
            },
          ],
          description:
            'Pork ribs roasted in beer and honey served with potato puree and fried cabbage',
        },
        {
          name:
            'Polędwica wołowa z grilla, zielona sałata z pomidorami, frytki lub ziemniak z dipem, sos borowikowy',
          variants: [
            {
              price: 75,
            },
          ],
          description: 'Tenderloin',
        },
        {
          name:
            'Antrykot z grilla, zielona sałata z pomidorami, frytki lub ziemniak z dipem, sos borowikowy',
          variants: [
            {
              price: 70,
            },
          ],
          description: 'Rib eye',
        },
      ],
    },
    {
      name: 'Dodatki',
      dishes: [
        {
          name: 'Frytki',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Chips',
        },
        {
          name: 'Kapusta zasmażana',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Fried cabbage',
        },
        {
          name: 'Ziemniaki',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Potatoes',
        },
        {
          name: 'Mix sałat z pomidorkami',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Lettuce with cherry tomatoes',
        },
        {
          name: 'Grillowany ziemniak z dipem',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Grilled potato with tzatziki dip',
        },
        {
          name: 'Grillowane warzywa',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Grilled vegetables',
        },
      ],
    },
    {
      name: 'Desery',
      dishes: [
        {
          name: 'Racuchy z jabłkami',
          variants: [
            {
              price: 16,
            },
          ],
          description: 'Polish apple pancakes with powdered sugar',
        },
        {
          name: 'Suflet czekoladowy podawany z lodami waniliowymi',
          variants: [
            {
              price: 19,
            },
          ],
          description: 'Chocolate souffle served with vanilla ice-cream',
        },
      ],
    },
    {
      name: 'Napoje',
      dishes: [
        {
          name: 'Herbata / Tea',
          variants: [
            {
              price: 9,
            },
          ],
        },
        {
          name: 'Espresso',
          variants: [
            {
              price: 7,
            },
          ],
        },
        {
          name: 'Kawa czarna / Black coffee',
          variants: [
            {
              price: 8,
            },
          ],
        },
        {
          name: 'Kawa biała / Coffee with milk',
          variants: [
            {
              price: 9,
            },
          ],
        },
        {
          name: 'Capuccino',
          variants: [
            {
              price: 10,
            },
          ],
        },
        {
          name: 'Latte',
          variants: [
            {
              price: 10,
            },
          ],
        },
        {
          name: 'Pepsi',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          name: '7 Up',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          name: 'Mirinda',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          name: 'Soki owocowe',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          name: 'Cisowianka Perlage lekko gazowana',
          variants: [
            {
              name: '300ml',
              price: 7,
            },
            {
              name: '700ml',
              price: 14,
            },
          ],
          description: 'Sparkling water',
        },
        {
          name: 'Kwas chlebowy',
          variants: [
            {
              price: 14,
            },
          ],
        },
        {
          name: 'Cydr lubelski',
          variants: [
            {
              price: 16,
            },
          ],
        },
        {
          name: 'Sok ze świeżych owoców',
          variants: [
            {
              name: '250ml',
              price: 16,
            },
          ],
        },
        {
          name: 'Cisowianka niegazowana',
          variants: [
            {
              name: '300ml',
              price: 7,
            },
            {
              name: '700ml',
              price: 14,
            },
          ],
          description: 'Still water',
        },
      ],
    },
    {
      name: 'Przystawki',
      dishes: [
        {
          name: 'Gołąbek podawany z sosem pomidorowym lub borowikowym',
          variants: [
            {
              price: 20,
            },
          ],
          description:
            'Stuffed cabbage leave with rice and meat served with tomato sauce or porcini mushroom sauce',
        },
        {
          name: 'Tatar z polędwicy wołowej',
          variants: [
            {
              price: 35,
            },
          ],
          description: 'Beef tenderloin tartare',
        },
        {
          name: 'Śledź po Krakowsku',
          variants: [
            {
              price: 19,
            },
          ],
          description: 'Herring Cracow style',
        },
        {
          name:
            'Kiełbaska jagnięco-cielęce z grilla podawane z konfiturą z czerwonej cebuli',
          variants: [
            {
              price: 29,
            },
          ],
          description:
            'Grilled lamb and veal sausage served withred onion confitur',
        },
      ],
    },
    {
      name: 'Piwa',
      dishes: [
        {
          name: 'Piwo lane Miłosław Pilzner',
          variants: [
            {
              name: '330ml',
              price: 10,
            },
            {
              name: '500ml',
              price: 13,
            },
          ],
        },
        {
          name: 'Regionalne piwa z browaru Trzy Korony',
          variants: [
            {
              price: 15,
            },
          ],
          description: '330ml',
        },
      ],
    },
    {
      name: 'Wina',
      dishes: [
        {
          name: 'Trebbiano, Rocca Estate',
          variants: [
            {
              name: '150ml',
              price: 16,
            },
            {
              name: '750ml',
              price: 70,
            },
          ],
          description: 'ITG Puglia, Italy',
        },
        {
          name: 'Kaiken Malbec Reserva 2013',
          variants: [
            {
              name: '750ml',
              price: 120,
            },
          ],
          description: 'Kaiken Mendoza Argentina',
        },
        {
          name: 'Sangiovese, Rocca Estate',
          variants: [
            {
              name: '150ml',
              price: 16,
            },
            {
              name: '750ml',
              price: 70,
            },
          ],
          description: 'ITG Puglia, Italy',
        },
        {
          name: 'Ripasso Valpolicella 2014',
          variants: [
            {
              name: '750ml',
              price: 149,
            },
          ],
          description: 'D.O.C, Italy',
        },
        {
          name: 'Picton Bay Sauvignon Blanc',
          variants: [
            {
              name: '750ml',
              price: 130,
            },
          ],
          description: 'Marlborough, New Zealand',
        },
        {
          name: 'Prosseco Sartori Brut',
          variants: [
            {
              name: '200ml',
              price: 32,
            },
          ],
          description: 'Veneto, Italy',
        },
        {
          name: 'Bodegas Centenarias Reservado Cabernet Sauvignon',
          variants: [
            {
              name: '750ml',
              price: 80,
            },
          ],
          description: 'Chile',
        },
        {
          name: 'Bodegas Centanarias Reservado Chardonnay',
          variants: [
            {
              name: '750ml',
              price: 80,
            },
          ],
          description: 'Chile',
        },
      ],
    },
    {
      name: 'Alkohle',
      dishes: [
        {
          name: 'Wyborowa',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          name: 'Finlandia',
          variants: [
            {
              name: '40ml',
              price: 12,
            },
          ],
        },
        {
          name: 'Chopin',
          variants: [
            {
              name: '40ml',
              price: 14,
            },
          ],
        },
        {
          name: 'Żołądkowa gorzka',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          name: 'Wiśniówka',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          name: 'Żubrówka',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          name: "Jack Daniel's",
          variants: [
            {
              name: '40ml',
              price: 16,
            },
          ],
        },
        {
          name: "Ballantine's Fnest",
          variants: [
            {
              name: '40ml',
              price: 14,
            },
          ],
        },
        {
          name: 'Glenvlivet 12YO',
          variants: [
            {
              name: '40ml',
              price: 28,
            },
          ],
        },
        {
          name: 'Hennesy VS',
          variants: [
            {
              name: '40ml',
              price: 22,
            },
          ],
        },
        {
          name: 'Hannesy Fine de Cognac',
          variants: [
            {
              name: '40ml',
              price: 25,
            },
          ],
        },
        {
          name: 'Lagavulin 16YO',
          variants: [
            {
              name: '40ml',
              price: 42,
            },
          ],
        },
      ],
    },
  ]

  test('Normalize menu', async () => {
    const result = normalizeMenu(menu)

    expect(result).toEqual([1, 2, 3])
  })
})
