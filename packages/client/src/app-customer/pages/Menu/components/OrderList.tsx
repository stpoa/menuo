import React, { FC } from 'react'
import { MenuEntry } from '@menuo/shared'
import { truncate } from '../../../../utils/text'

interface OrderedListProps {
  ordered: [MenuEntry, number][]
}

export const OrderedList: FC<OrderedListProps> = ({ ordered }) => (
  <ul>
    {ordered.map(([entry, count]) => (
      <li key={entry._id}>
        {count}x {truncate(80)(entry.dishName)} -{' '}
        {truncate(80)(entry.dishVariantName || '')} ({entry.dishVariantPrice}
        zł)
      </li>
    ))}
  </ul>
)
