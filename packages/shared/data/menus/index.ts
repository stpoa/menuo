import { readdirSync, readFileSync } from 'fs'
import yaml from 'js-yaml'
import { IRestaurant, Lanuage } from '@menuo/shared'
import { last } from 'ramda'

export const readMenus = (
  menusDir = __dirname.replace('/dist', ''),
): IRestaurant[] =>
  readdirSync(menusDir)
    .filter((fileName) => fileName.endsWith('.yml'))
    .map((fileName) => {
      const nameWithoutExtension = fileName.replace('.yml', '')
      const l = last(nameWithoutExtension.split('-'))
      const language: Lanuage | undefined =
        l === 'pl' || l === 'en' ? l : undefined
      console.log({ language })
      if (!language) {
        throw new Error('No language for file found!, file: ' + fileName)
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
