import { Route, NavLink, Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import './signUp.css'
import '../components.css'

import signUpImg from '../../static/images/Sign up.jpg'
// components
import Homeowner from './Homeowner/homeowner'
import Official from './Official/official'

export default function SignUp(){
    const { url } = useRouteMatch()
    const activeStyle = { borderBottom: 'solid #26B4F9 2px' }
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
                    <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/homeowner`}>Homeowner</NavLink>
                    <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/official`}>Official</NavLink>
                </div>
                <div>
                    <Route path={`${url}/homeowner`} component={Homeowner}/>
                    <Route path={`${url}/official`} component={Official}/>
                </div>
                <div className='loginOptions'>
                    <Link>Forgot Password?</Link>
                </div>
            </div>
        </div>
    )
}