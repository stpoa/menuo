import React, { FC } from 'react'
import { Button, withStyles, WithStyles, createStyles } from '@material-ui/core'

interface PlusMinusProps extends WithStyles {
  count: number
  handleMinusClick: () => void
  handlePlusClick: () => void
}

export const PlusMinus: FC<PlusMinusProps> = ({
  count,
  handleMinusClick,
  handlePlusClick,
  classes,
}) => {
  return (
    <div className={classes.root}>
      <Button onClick={handleMinusClick}>-</Button>
      <div className={classes.count}>{count}</div>
      <Button onClick={handlePlusClick}>+</Button>
    </div>
  )
}

export default withStyles(_ =>
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
)(PlusMinus)
