import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

import Logo from '../../static/images/Logo.png'
import './navbar.css'
import '../components.css'
import { Fragment } from "react"
export default function Navbar() {
    const auth = useAuth()
    return(
        <div className='navbar'>
            <div>
                <NavLink className='navLink' to='/'><img src={Logo}></img></NavLink>
            </div>
            <div>
                <NavLink className='navLink' to='/aboutUs'>About Us</NavLink>
                {/* homeownerNav */}
                {auth.user.type == 'homeowner' ? (
                    <Fragment>
                        <NavLink className='navLink' to='/editProfile'>Profile</NavLink>
                    </Fragment>
                ) : ''}
                {/* officialNav */}
                {auth.user.type == 'official' ? (
                    <Fragment>
                        <NavLink className='navLink' to='/search'>Search</NavLink>
                    </Fragment>
                ) : ''}
                {/* login/logout */}
                {auth.user ? (
                    <Fragment>
                        <NavLink className='navLink buttonColored secondary' to='/login'>Login</NavLink>
                        <NavLink className='navLink buttonColored' to='/signUp/homeowner'>Sign Up</NavLink>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button className='buttonText' onClick={e => auth.signout()}>Logout</button>
                    </Fragment>
                ) }
                
            </div>
        </div>
    )
}