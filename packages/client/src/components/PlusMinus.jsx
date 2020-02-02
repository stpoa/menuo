import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    count: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  }),
)

export const PlusMinus = ({ count, handleMinusClick, handlePlusClick }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button onClick={handleMinusClick}>-</Button>
  <div className={classes.count}>{count}</div>
      <Button onClick={handlePlusClick}>+</Button>
    </div>
  )
}
