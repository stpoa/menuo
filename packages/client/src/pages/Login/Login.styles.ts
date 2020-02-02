import { makeStyles, createStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: '2rem',
    },
    container: {
      padding: '1rem',
    },
  }),
)
