import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

export default function OfficialRoute({ children, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user?._id && user?.isOffical) ? (children) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}