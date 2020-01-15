import React from 'react'
import { Typography } from '@material-ui/core'

export const H1 = ({ children }) => (
  <Typography component="h1" variant="h4">
    {children}
  </Typography>
)
