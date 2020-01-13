import React, { useRef, useState, useEffect } from 'react'
import { RouteComponentProps, Redirect } from 'react-router'

import { useStyles } from './Login.styles'
import { Paper, Grid, TextField, Button } from '@material-ui/core'
import { Face, Fingerprint } from '@material-ui/icons'
import { login, isLoggedIn } from '../../auth/service'
import { readSubscription } from '../../notifications'

export const LoginPage = ({ location, match }: RouteComponentProps) => {
  const { restaurant } = match.params as { restaurant: string }

  const [loggedIn, setLoggedIn] = useState(isLoggedIn())
  const classes = useStyles()
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

  return loggedIn ? (
    <Redirect to={`/${restaurant}/orders`} />
  ) : (
    <Paper>
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
