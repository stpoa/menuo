import { WaiterUser } from '@menuo/shared'
import { MongoClient, ObjectId } from 'mongodb'

export const getWaiterUser = (client: MongoClient) => async ({
  username,
}: Pick<WaiterUser, 'username'>) => {
  const collection = client.db('menuo').collection<WaiterUser>('users')
  const user = await collection.findOne({ username })
  return user
}

export const updateWaiterUser = (client: MongoClient) => async (
  { _id }: Pick<WaiterUser, '_id'>,
  updates: Partial<WaiterUser>,
) => {
  const collection = client.db('menuo').collection<WaiterUser>('users')
  return await collection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: updates },
  )
}

export const getRestaurantWaiterUsers = (client: MongoClient) => async ({
  restaurant,
}: Pick<WaiterUser, 'restaurant'>) => {
  const collection = client.db('menuo').collection<WaiterUser>('users')
  const users = await collection.find({ restaurant }).toArray()
  return users
}
