import { makeStyles, createStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexDirection: 'column',
      padding: '1rem',
    },
    menuContent: {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
    buttons: {
      display: 'flex',
      position: 'fixed',
      bottom: '0.5rem',
      left: '50%',
      width: '96%',
      marginLeft: '-48%',
      flexDirection: 'row',
      justifyContent: 'center',
      background: 'white',
    },
    buttonLeft: {
      width: '50%',
      marginRight: '0.5rem',
    },
    buttonRight: {
      width: '50%',
      marginLeft: '0.5rem',
    },
    dialogButtons: {
      display: 'flex',
      flexDirection: 'column',
    },
  }),
)
