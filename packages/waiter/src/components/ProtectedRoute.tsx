import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { isLoggedIn } from '../auth/service'

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(true)
  React.useEffect(() => {
    if (isLoggedIn()) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  let redirectPath = ''
  if (!isAuthenticated) {
    redirectPath = props.authenticationPath
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  } else {
    return <Route {...props} />
  }
}

export default ProtectedRoute
