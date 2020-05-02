import { createStyles } from '@material-ui/core'

export const styles = () =>
  createStyles({
    content: {
      backgroundColor: '#f5f5f5',
      flexDirection: 'column',
      padding: '0.75rem 1rem',
      minHeight: '100vh',
    },
    menuContent: {
      marginTop: '1rem',
      marginBottom: '1rem',
      minHeight: '90vh',
    },
    buttons: {
      display: 'flex',
      position: 'fixed',
      bottom: '0',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      background: 'whitesmoke',
      maxWidth: '640px',
      minWidth: '320px',
      padding: '0.2rem 0',
    },
    buttonLeft: {
      flex: 1,
      margin: '0 0.5rem 0 1rem',
      fontSize: '0.8rem',
      background: 'white',
    },
    buttonRight: {
      flex: 1,
      margin: '0 1rem 0 0.5rem',
      fontSize: '0.8rem',
    },
  })
