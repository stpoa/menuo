import { readdirSync, readFileSync, writeFileSync } from 'fs'
import yaml from 'js-yaml'
import { IRestaurant, unnestMenu } from 'menuo-shared'

export const readMenus = (menusDir = './data/menus'): IRestaurant[] =>
  readdirSync(menusDir).map(file => ({
    restaurant: file.replace('.yml', ''),
    menu: yaml.safeLoad(readFileSync(`${menusDir}/${file}`).toString()),
  }))

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