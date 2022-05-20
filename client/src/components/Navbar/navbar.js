import { NavLink } from "react-router-dom"

import './navbar.css'
export default function Navbar() {
    return(
        <div className='navbar'>
            <div>
                <NavLink to='/'>Charody</NavLink>
            </div>
            <div>
                <NavLink className='navLink' to='/'>About Us</NavLink>
                <NavLink className='navLink' to='/'>Login</NavLink>
                <NavLink className='navLink' to='/'>Sign Up</NavLink>
            </div>
        </div>
    )
}