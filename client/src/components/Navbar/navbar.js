import { NavLink } from "react-router-dom"

import './navbar.css'
import '../components.css'
export default function Navbar() {
    return(
        <div className='navbar'>
            <div>
                <NavLink className='navLink' to='/'>Charody</NavLink>
            </div>
            <div>
                <NavLink className='navLink' to='/aboutUs'>About Us</NavLink>
                <NavLink className='navLink buttonColored invert' to='/login'>Login</NavLink>
                <NavLink className='navLink buttonColored' to='/signUp'>Sign Up</NavLink>
            </div>
        </div>
    )
}