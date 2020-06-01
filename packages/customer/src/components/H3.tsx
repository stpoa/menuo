import React, { FC } from 'react'
import { Typography } from '@material-ui/core'

export const H3: FC<{}> = ({ children }) => (
  <Typography component="h3" variant="h6">
    {children}
  </Typography>
)
