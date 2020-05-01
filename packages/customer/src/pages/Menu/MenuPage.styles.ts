import { createStyles } from '@material-ui/core'

export const styles = () =>
  createStyles({
    root: {
      backgroundColor: '#f5f5f5',
      flexDirection: 'column',
      padding: '0.75rem 1rem',
      minHeight: '100vh',
    },
    search: {
      display: 'flex',
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
      marginLeft: '-1rem',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      background: 'whitesmoke',
      maxWidth: '640px',
      minWidth: '320px',
    },
    buttonLeft: {
      width: '50%',
      margin: '0 0.5rem 0 1rem',
      fontSize: '0.8rem',
      background: 'white',
    },
    buttonRight: {
      width: '50%',
      margin: '0 1rem 0 0.5rem',
      fontSize: '0.8rem',
    },
    orderedListFab: {
      width: '40px',
      height: '40px',
      zIndex: 100,
    },
    basketButton: {
      width: '40px',
      height: '40px',
      zIndex: 100,
    },
    searchButton: {
      width: '40px',
      height: '40px',
    },
    languageButton: {
      width: '40px',
      height: '40px',
    },
    searchInput: {
      width: '100%',
      fontSize: '1rem',
    },
  })
