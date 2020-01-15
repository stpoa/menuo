import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexDirection: 'column',
      padding: '1rem',
    },
    logoutFab: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      width: '40px',
      height: '40px',
    },
  }),
)
