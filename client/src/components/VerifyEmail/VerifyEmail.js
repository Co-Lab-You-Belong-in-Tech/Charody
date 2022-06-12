import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { verifyEmail } from '../../services/users.js'

export default function VerifyEmail(){
  const [loading, setLoading] = useState(true)
  const [verifyWasSuccessful, setVerifyWasSuccessful] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { search } = useLocation()

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams(search)
    const email = params.get('email')
    const code = params.get('code')
    if(!loaded && email && code) {
      if(!email || !code) {
        setVerifyWasSuccessful(false)
        setLoading(false)
        setLoaded(true)
        return
      }
      verifyEmail(email, code, controller.signal).then(({ message }) => {
        if(message === 'account verified') {
          setVerifyWasSuccessful(true)
          setLoaded(true)
          setLoading(false)
        }
      }).catch(e => {
        setVerifyWasSuccessful(false)
        setLoaded(true)
        setLoading(false)
      })
    }

    return () => controller.abort()
  }, [loaded, search])

  if(loading) return <h1>Loading...</h1>

  return (
    <div>
      {verifyWasSuccessful && (
        <h1>Account verified, you may now log in</h1>
      )}
      {/** TODO: add a way to resend the email */}
      {!verifyWasSuccessful && (
        <h1>Could not verify your account</h1> 
      )}
    </div>
  )

}