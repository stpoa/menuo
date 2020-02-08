import evolve from 'ramda/es/evolve'
import is from 'ramda/es/is'

export const getConfig = (): Config => {
  const { REACT_APP_API_URL } = process.env as Env

  const rawConfig: RawConfig = {
    apiUrl: REACT_APP_API_URL,
  }

  return validateConfig(rawConfig)
}

type UnknownObject<O extends object> = {
  [K in keyof O]: O[K] extends object ? unknown | UnknownObject<O[K]> : unknown
}

interface Env {
  REACT_APP_API_URL?: string
}

interface Config {
  apiUrl: string
}

type RawConfig = UnknownObject<Config>

const validateConfig = (rawConfig: RawConfig): Config => {
  const isValidObject = <T extends {}>(
    checks: { [k in keyof T]: (val: any) => boolean },
  ) => (obj: any) => {
    const isPropValid = evolve(checks)(obj)
    return Object.values(isPropValid).every(v => v)
  }

  if (isValidObject({ apiUrl: is(String) })(rawConfig)) {
    return rawConfig as Config
  } else throw Error('ENV config error!')
}
