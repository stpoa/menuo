import { readdirSync, readFileSync, writeFileSync } from 'fs'
import yaml from 'js-yaml'
import { IRestaurant, unnestMenu, Lanuage } from 'menuo-shared'
import { last } from 'ramda'

export const readMenus = (menusDir = './data/menus'): IRestaurant[] =>
  readdirSync(menusDir).map(fileName => {
    const nameWithoutExtension = fileName.replace('.yml', '')
    const l = last(nameWithoutExtension.split('-'))
    const language: Lanuage | undefined =
      l === 'pl' || l === 'en' ? l : undefined
    if (!language) {
      throw new Error('No language for file found!')
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

export const parseMenus = () => {
  const menusDir = './data/menus'
  const menusParsedDir = './data/menus-parsed'

  const nestedMenus = readMenus(menusDir)
  const flatMenus = nestedMenus.map(unnestMenu)

  flatMenus.forEach(m =>
    writeFileSync(
      menusParsedDir + '/' + m[0].restaurant + '.json',
      JSON.stringify(m, null, 2),
    ),
  )
}

parseMenus()
