import React from 'react'
import { H1 } from './H1'
import { withStyles, createStyles, WithStyles } from '@material-ui/core'

export const HeaderLogoRaw: React.FC<WithStyles> = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <H1>{children}</H1>
      </div>
    </div>
  )
}

export const HeaderLogo = withStyles((_) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    content: {
      textAlign: 'center',
      fontFamily: "'Megrim', sans-serif",
      color: '#777',
      fontSize: '2rem',
    },
  }),
)(HeaderLogoRaw)
