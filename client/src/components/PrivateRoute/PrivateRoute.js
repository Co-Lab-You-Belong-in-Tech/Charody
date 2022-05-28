import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?._id ? (children) : (
          <Redirect
            to={{
              pathname: "/logifn",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}