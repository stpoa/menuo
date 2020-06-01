import React, { FC, useEffect, useState } from 'react'
import {
  createStyles,
  LinearProgress,
  WithStyles,
  withStyles,
} from '@material-ui/core'

export const LoadingRaw: FC<LoadingProps & WithStyles> = ({
  loading,
  classes,
}) => {
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 300)

    return () => clearTimeout(timer)
  })

  return loading && showSpinner ? (
    <LinearProgress className={classes.progress} />
  ) : null
}

export const Loading = withStyles((_) =>
  createStyles({
    progress: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
    },
  }),
)(LoadingRaw)

interface LoadingProps {
  loading: boolean
}
