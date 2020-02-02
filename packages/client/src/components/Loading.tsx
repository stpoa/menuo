import React, { FC, useEffect, useState } from 'react'
import { makeStyles, createStyles, LinearProgress } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    progress: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
    },
  }),
)

export const Loading: FC<LoadingProps> = ({ loading }) => {
  const [showSpinner, setShowSpinner] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(true), 300)

    return () => clearTimeout(timer)
  })

  return loading && showSpinner ? (
    <LinearProgress className={classes.progress} />
  ) : null
}

interface LoadingProps {
  loading: boolean
}
