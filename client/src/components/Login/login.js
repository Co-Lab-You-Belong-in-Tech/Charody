import { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'
import { logIn, getUser } from '../../services/users.js'
import loginImg from '../../static/images/login_welcome back.png'
import './login.css'
export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useAuth()
    const history = useHistory()
    const params = new URLSearchParams(useLocation().search)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await logIn(email, password)
        if(res.message === 'Signed in successfully!') {
            const user = await getUser()
            setUser(user)
            if(params.get("redirect") === "true") {
                history.goBack()
            } else {
                if(user.isOfficial) {
                    history.push("/search")
                } else {
                    if(user.hasListing) {
                        history.push("/editProfile")
                    } else {
                        history.push("/profileCreation/info")
                    }
                }
            }
        }
    }
    return(
        <div className='login'>
            <div className='loginImage'>
                <h2>Welcome Back!</h2>
                <img src={loginImg}></img>
            </div>
            <form onSubmit={handleSubmit}>
                <input placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)}></input>
                <input placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)}></input>
                <button type='submit' className='buttonColored full'>Login</button>
                <div className='loginOptions'>
                    <Link to='/forgotPassword'>Forgot Password?</Link>
                    <div>
                        <p>Dont have an account?</p>
                        <Link to='/signUp/homeowner'>Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
        
    )
}