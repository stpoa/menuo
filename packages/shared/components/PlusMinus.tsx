import React, { FC } from 'react'
import { Button, withStyles, WithStyles, createStyles } from '@material-ui/core'

interface PlusMinusProps extends WithStyles {
  count: number
  handleMinusClick: () => void
  handlePlusClick: () => void
}

export const PlusMinusRaw: FC<PlusMinusProps> = ({
  count,
  handleMinusClick,
  handlePlusClick,
  classes,
}) => {
  return (
    <div className={classes.root}>
      <Button {...{ 'data-cy': 'minus-click' }} onClick={handleMinusClick}>
        -
      </Button>
      <div className={classes.count}>{count}</div>
      <Button {...{ 'data-cy': 'plus-click' }} onClick={handlePlusClick}>
        +
      </Button>
    </div>
  )
}

export const PlusMinus = withStyles((_) =>
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
)(PlusMinusRaw)
