import { makeStyles, createStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    head: {
      color: '#777',
      padding: '0 1rem',
      marginTop: '3rem',
    },
    dish: {
      color: '#444444',
      margin: '1rem 0',
    },
    dishVariant: {
      padding: '0 1rem',
      fontSize: '0.8rem',
      borderTop: '1px solid #ccc',
    },
    variantText: {
      fontSize: '0.8rem',
    },
  }),
)
