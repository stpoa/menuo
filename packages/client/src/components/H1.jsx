import React from 'react'
import { Typography } from '@material-ui/core'

export const H1 = ({ children }) => (
  <span
    style={{ fontSize: '1rem', fontWeight: '100', color: '#272727' }}
    component="h1"
    variant="h4"
  >
    {children}
  </span>
)
