import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import { H1 } from '../components/H1'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginTop: '1rem',
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    content: {
      // width: '50%',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
  }),
)

export const Header = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <H1>{children}</H1>
      </div>
    </div>
  )
}