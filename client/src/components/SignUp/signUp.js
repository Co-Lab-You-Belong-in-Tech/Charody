import { NavLink, Link, useParams, useHistory } from 'react-router-dom'
import './signUp.css'
import '../components.css'

import signUpImg from '../../static/images/Sign up.jpg'
// components
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.js'

export default function SignUp(){
    const activeStyle = { borderBottom: 'solid #26B4F9 2px' }
    const { type } = useParams()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { signUp } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isOfficial = type === 'official'
        signUp(email, password, isOfficial)
    }

    return(
        <div className='signUp'>
            <div className='signUpImg'>
                <img src={signUpImg}></img>
                <div>
                    <p>
                        Thank you for taking the<br/>
                        initiative to sign up today.<br/>
                        Your kindness makes a<br/>
                        positive difference
                    </p>
                </div>
                
            </div>
            
            <div>
                <div className='navLink'>
                    <NavLink className='navLink' activeStyle={activeStyle} to={`/signUp/homeowner`}>Homeowner</NavLink>
                    <NavLink className='navLink' activeStyle={activeStyle} to={`/signUp/official`}>Official</NavLink>
                </div>
                <form className='homeownerForm' onSubmit={handleSubmit}>
                    <input placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)}></input>
                    <input placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)}></input>
                    <button type='submit' className='buttonColored full'>Create an Account</button>
                </form>
                <div className='loginOptions'>
                    <Link>Forgot Password?</Link>
                </div>
            </div>
        </div>
    )
}