import React, { FC } from 'react'
import { Typography } from '@material-ui/core'

export const H2: FC<{}> = ({ children }) => (
  <Typography component="h2" variant="h5" style={{ fontWeight: 200 }}>
    {children}
  </Typography>
)
