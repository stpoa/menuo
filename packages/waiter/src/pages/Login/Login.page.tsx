import React, { useRef, useState, FC } from 'react'
import { RouteComponentProps, Redirect } from 'react-router'

import {
  Paper,
  Grid,
  TextField,
  Button,
  withStyles,
  WithStyles,
  createStyles,
} from '@material-ui/core'
import { Face, Fingerprint } from '@material-ui/icons'
import { login, isLoggedIn } from '../../auth/service'
import { readSubscription } from '../../notifications'

export const LoginPage: FC<RouteComponentProps & WithStyles> = ({
  match,
  classes,
}) => {
  const { restaurant } = match.params as { restaurant: string }
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  const usernameInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const username = usernameInput?.current?.value ?? ''
    const password = passwordInput?.current?.value ?? ''

    login(
      { restaurant },
      { username, password, subscription: readSubscription() },
    ).then(() => setLoggedIn(true))
  }

  if (restaurant === 'demo') {
    login(
      { restaurant },
      { username: 'demo', password: 'demo', subscription: readSubscription() },
    ).then(() => setLoggedIn(true))
  }

  return loggedIn ? (
    <Redirect to={`/${restaurant}/orders`} />
  ) : (
    <Paper className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="username"
              label="Username"
              inputRef={usernameInput}
              type="text"
              fullWidth
              autoFocus
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField
              id="password"
              label="Password"
              inputRef={passwordInput}
              type="password"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
          >
            Login
          </Button>
        </Grid>
      </form>
    </Paper>
  )
}

export default withStyles(_ =>
  createStyles({
    root: {},
  }),
)(LoginPage)
