import React, { FC, useEffect, useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    inner: {},
    content: {},
    spinner: {},
  }),
)

export const Loading: FC<LoadingProps> = ({ delay = 500 }) => {
  const classes = useStyles()
  const [showLoader, setShowLoader] = useState(delay === 0)

  useEffect(() => {
    const delayTimeout = setTimeout(() => setShowLoader(true), delay)

    return () => clearTimeout(delayTimeout)
  }, [delay])

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <span className={classes.spinner}></span>
        </div>
      </div>
    </div>
  )
}

interface LoadingProps {
  delay?: number 
}
