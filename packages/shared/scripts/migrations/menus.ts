import { readdirSync, readFileSync, writeFileSync } from 'fs'
import yaml from 'js-yaml'
import { last } from 'ramda'
import { IRestaurant, Lanuage } from '../../interfaces/menu'
import { unnestMenu } from '../../transformations/menu'

export const readMenus = (menusDir = './data/menus'): IRestaurant[] =>
  readdirSync(menusDir)
    .map((fileName: string): IRestaurant | undefined => {
      const nameWithoutExtension = fileName.replace('.yml', '')
      const l = last(nameWithoutExtension.split('-'))
      const language: Lanuage | undefined =
        l === 'pl' || l === 'en' ? l : undefined
      if (!language) {
        console.warn('No language for file found!')
        return undefined
      }
      const restaurant = nameWithoutExtension.replace('-' + language, '')
      const menu = yaml.safeLoad(
        readFileSync(`${menusDir}/${fileName}`).toString(),
      )

      return {
        language,
        restaurant,
        menu,
      }
    })
    .filter((v) => !!v)
    .map((v) => v as IRestaurant)

export const parseMenus = () => {
  const menusDir = './data/menus'
  const menusParsedDir = './data/menus-parsed'

  const nestedMenus = readMenus(menusDir)
  console.log({ nestedMenus })
  const flatMenus = nestedMenus.map(unnestMenu)
  console.log({ flatMenus })

  flatMenus.forEach((m) =>
    writeFileSync(
      menusParsedDir + '/' + m[0].restaurant + '-' + m[0].language + '.json',
      JSON.stringify(m, null, 2),
    ),
  )
}

parseMenus()
