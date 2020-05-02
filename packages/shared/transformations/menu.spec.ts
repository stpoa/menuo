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
          id: '4',
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
          id: '19',
          name: 'Kapusta zasmażana',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Fried cabbage',
        },
        {
          id: '20',
          name: 'Ziemniaki',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Potatoes',
        },
        {
          id: '21',
          name: 'Mix sałat z pomidorkami',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Lettuce with cherry tomatoes',
        },
        {
          id: '22',
          name: 'Grillowany ziemniak z dipem',
          variants: [
            {
              price: 9,
            },
          ],
          description: 'Grilled potato with tzatziki dip',
        },
        {
          id: '23',
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
          id: '24',
          name: 'Racuchy z jabłkami',
          variants: [
            {
              price: 16,
            },
          ],
          description: 'Polish apple pancakes with powdered sugar',
        },
        {
          id: '25',
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
          id: '25',
          name: 'Herbata / Tea',
          variants: [
            {
              price: 9,
            },
          ],
        },
        {
          id: '26',
          name: 'Espresso',
          variants: [
            {
              price: 7,
            },
          ],
        },
        {
          id: '27',
          name: 'Kawa czarna / Black coffee',
          variants: [
            {
              price: 8,
            },
          ],
        },
        {
          id: '28',
          name: 'Kawa biała / Coffee with milk',
          variants: [
            {
              price: 9,
            },
          ],
        },
        {
          id: '29',
          name: 'Capuccino',
          variants: [
            {
              price: 10,
            },
          ],
        },
        {
          id: '30',
          name: 'Latte',
          variants: [
            {
              price: 10,
            },
          ],
        },
        {
          id: '31',
          name: 'Pepsi',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          id: '32',
          name: '7 Up',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          id: '33',
          name: 'Mirinda',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          id: '34',
          name: 'Soki owocowe',
          variants: [
            {
              name: '200ml',
              price: 7,
            },
          ],
        },
        {
          id: '35',
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
          id: '36',
          name: 'Kwas chlebowy',
          variants: [
            {
              price: 14,
            },
          ],
        },
        {
          id: '37',
          name: 'Cydr lubelski',
          variants: [
            {
              price: 16,
            },
          ],
        },
        {
          id: '38',
          name: 'Sok ze świeżych owoców',
          variants: [
            {
              name: '250ml',
              price: 16,
            },
          ],
        },
        {
          id: '39',
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
          id: '40',
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
          id: '41',
          name: 'Tatar z polędwicy wołowej',
          variants: [
            {
              price: 35,
            },
          ],
          description: 'Beef tenderloin tartare',
        },
        {
          id: '42',
          name: 'Śledź po Krakowsku',
          variants: [
            {
              price: 19,
            },
          ],
          description: 'Herring Cracow style',
        },
        {
          id: '43',
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
          id: '44',
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
          id: '45',
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
          id: '46',
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
          id: '47',
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
          id: '48',
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
          id: '49',
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
          id: '50',
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
          id: '51',
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
          id: '52',
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
          id: '53',
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
          id: '54',
          name: 'Wyborowa',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          id: '55',
          name: 'Finlandia',
          variants: [
            {
              name: '40ml',
              price: 12,
            },
          ],
        },
        {
          id: '56',
          name: 'Chopin',
          variants: [
            {
              name: '40ml',
              price: 14,
            },
          ],
        },
        {
          id: '57',
          name: 'Żołądkowa gorzka',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          id: '58',
          name: 'Wiśniówka',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          id: '59',
          name: 'Żubrówka',
          variants: [
            {
              name: '40ml',
              price: 10,
            },
          ],
        },
        {
          id: '60',
          name: "Jack Daniel's",
          variants: [
            {
              name: '40ml',
              price: 16,
            },
          ],
        },
        {
          id: '61',
          name: "Ballantine's Fnest",
          variants: [
            {
              name: '40ml',
              price: 14,
            },
          ],
        },
        {
          id: '62',
          name: 'Glenvlivet 12YO',
          variants: [
            {
              name: '40ml',
              price: 28,
            },
          ],
        },
        {
          id: '63',
          name: 'Hennesy VS',
          variants: [
            {
              name: '40ml',
              price: 22,
            },
          ],
        },
        {
          id: '64',
          name: 'Hannesy Fine de Cognac',
          variants: [
            {
              name: '40ml',
              price: 25,
            },
          ],
        },
        {
          id: '65',
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
