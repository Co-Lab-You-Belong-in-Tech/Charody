import { NavLink } from "react-router-dom"

import Logo from '../../static/images/Logo.png'
import './navbar.css'
import '../components.css'
export default function Navbar() {
    return(
        <div className='navbar'>
            <div>
                <NavLink className='navLink' to='/'><img src={Logo}></img></NavLink>
            </div>
            <div>
                <NavLink className='navLink' to='/aboutUs'>About Us</NavLink>
                <NavLink className='navLink buttonColored invert' to='/login'>Login</NavLink>
                <NavLink className='navLink buttonColored' to='/signUp/homeowner'>Sign Up</NavLink>
            </div>
        </div>
    )
}