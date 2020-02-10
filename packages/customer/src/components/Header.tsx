import React from 'react'
import { H1 } from './H1'
import { withStyles, createStyles, WithStyles } from '@material-ui/core'

export const HeaderRaw: React.FC<WithStyles> = ({ children, classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <H1>{children}</H1>
      </div>
    </div>
  )
}

export const Header = withStyles(theme =>
  createStyles({
    root: {
      paddingTop: '0.4rem',
      paddingBottom: '0.9rem',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    content: {
      textAlign: 'center',
      fontFamily: "'Megrim', cursive",
      color: '#777',
      fontSize: '2rem',
    },
  }),
)(HeaderRaw)
