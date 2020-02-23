import React, { FC } from 'react'
import { Fab } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

export interface SearchButtonProps {
  onClick: () => void
  className: string
}

export const SearchButton: FC<SearchButtonProps> = ({ onClick, className }) => (
  <Fab {...{ onClick, className }} aria-label="cart">
    <SearchIcon />
  </Fab>
)
