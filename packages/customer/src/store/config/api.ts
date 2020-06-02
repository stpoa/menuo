import { getStaticJSONData } from '../../api'
import { GetRestaurantConfig } from '@menuo/shared/interfaces/api'

export const getRestaurantConifig = ({
  restaurant,
}: {
  restaurant: string
}): Promise<GetRestaurantConfig.Response> =>
  getStaticJSONData(`${restaurant}/config.json`)
