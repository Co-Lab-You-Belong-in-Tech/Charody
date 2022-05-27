import { Link } from 'react-router-dom'
import loginImg from '../../static/images/login_welcome back.png'
import './login.css'
export default function Login(){
    return(
        <div className='login'>
            <div className='loginImage'>
                <h2>Welcome Back!</h2>
                <img src={loginImg}></img>
            </div>
            <form>
                <input placeholder='Email'></input>
                <input placeholder='Password'></input>
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