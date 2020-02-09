import { createStyles } from '@material-ui/core'

export const styles = () =>
  createStyles({
    root: {
      backgroundColor: '#f5f5f5',
      flexDirection: 'column',
      padding: '0.75rem 1rem',
      minHeight: '100vh',
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
    },
    buttonLeft: {
      width: '50%',
      marginRight: '0.5rem',
      fontSize: '0.8rem',
      background: 'white',
    },
    buttonRight: {
      width: '50%',
      marginLeft: '0.5rem',
      fontSize: '0.8rem',
    },
    orderedListFab: {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      width: '40px',
      height: '40px',
      zIndex: 100,
    },
    basketButton: {
      position: 'fixed',
      top: '1rem',
      right: '4rem',
      width: '40px',
      height: '40px',
      zIndex: 100,
    },
  })