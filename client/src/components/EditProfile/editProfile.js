import { Route, NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import '../ProfileCreation/profileCreation.css'
import '../components.css'
import './editProfile.css'

import Info from '../ProfileCreation/Info/info'
import Home from '../ProfileCreation/Home/home'
import VerifyID from '../ProfileCreation/VerifyID/verifyID'

export default function EditProfile() {
    const { url } = useRouteMatch()
    const data = useSelector(state => state.signup.value)
    const activeStyle = { color: '#26B4F9' }
    useEffect(() => {
        // obtains user data from db
        // dispatches user data to reduxStore
    })
    return(
        <div className='editProfile'>
            <div className='navLink'>
                <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/info`} url={url}>Your Info</NavLink>
                <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/home`} url={url}>Home Details</NavLink>
                <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/idVerification`} url={url}>ID Verification</NavLink>
            </div>
            <div className='form'>
                <Route path={`${url}/info`} component={Info}></Route>
                <Route path={`${url}/home`} component={Home}></Route>
                <Route path={`${url}/idVerification`} component={VerifyID}></Route>
                <button className='buttonColored full done' onClick={e => {
                    // sends const data to database
                }}>Save</button>
            </div>
        </div>
    )
}