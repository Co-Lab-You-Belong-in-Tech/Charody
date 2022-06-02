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
                <NavLink className='navLink' to='/'><img src={Logo} alt=''></img></NavLink>
            </div>
            <div>
                <NavLink className='navLink' to='/aboutUs'>About Us</NavLink>
                {/* homeownerNav */}
                {auth.user.isOfficial === false  ? (
                    <Fragment>
                        <NavLink className='navLink' to='/editProfile'>Profile</NavLink>
                    </Fragment>
                ) : ''}
                {/* officialNav */}
                {auth.user.isOfficial === true ? (
                    <Fragment>
                        <NavLink className='navLink' to='/search'>Search</NavLink>
                    </Fragment>
                ) : ''}
                {/* login/logout */}
                {!auth.user._id ? (
                    <Fragment>
                        <NavLink className='navLink buttonColored secondary' to='/login'>Login</NavLink>
                        <NavLink className='navLink buttonColored' to='/signUp/homeowner'>Sign Up</NavLink>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button className='buttonText' onClick={auth.signOut}>Logout</button>
                    </Fragment>
                ) }
                
            </div>
        </div>
    )
}