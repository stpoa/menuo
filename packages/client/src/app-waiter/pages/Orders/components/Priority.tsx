import React from 'react'
import { Select, MenuItem, SelectProps } from '@material-ui/core'

interface PrioritySelectProps extends SelectProps {}

export const PrioritySelect = ({
  onChange,
  value,
  ...rest
}: PrioritySelectProps) => {
  return (
    <Select {...rest} value={value} onChange={onChange}>
      <MenuItem value={1}>1</MenuItem>
      <MenuItem value={2}>2</MenuItem>
      <MenuItem value={3}>3</MenuItem>
    </Select>
  )
}
