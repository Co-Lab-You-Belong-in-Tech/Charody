import { Route, NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import '../components.css'
import './profileCreation.css'

// components
import Info from './Info/info'
import Home from './Home/home'
import Verify from './Verify/verify'
import VerifyID from './VerifyID/verifyID'

import ProfileCreationTextHeader from './profileCreationTextHeader'
import ProfileCreationImg from '../../static/images/account sign up.jpg'

export default function ProfileCreation(){
    const { url } = useRouteMatch()
    const activeStyle = { color: '#26B4F9' }
    return(
        <div className='profileCreation'>
            <img src={ProfileCreationImg}></img>
            <div>
                <div>
                    <Route path={`${url}/info`}><h3>Thank you for taking the step to volunteer!<br/>Hosting helps evacuees transition better.</h3></Route>
                    <Route path={`${url}/home`}><h3>You're helping disaster affected evacuees!<br/>All info will be confirmed again if you're contacted.</h3></Route>
                    <Route path={`${url}/verifyID`}><h3>Your ID will be verified by our staff and never shared.<br/>Please upload an ID and photo in .jpg, .png, or .pdf.</h3></Route>
                    <Route path={`${url}/verify`}><h3>Almost done!<br/>Just double check and you'll be in the system.</h3></Route>
                </div>
                <div>
                    <div className='navLink'>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/info`} url={url}>Your Info</NavLink><div className='dash'/>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/home`} url={url}>Home Details</NavLink><div className='dash'/>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/verifyID`} url={url}>Verify ID</NavLink><div className='dash'/>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/verify`} url={url}>Verify</NavLink>
                    </div>
                    <div className='form'>
                        <Route path={`${url}/info`}><Info url={url}/></Route>
                        <Route path={`${url}/home`}><Home url={url}/></Route>
                        <Route path={`${url}/verifyID`}><VerifyID url={url}/></Route>
                        <Route path={`${url}/verify`} component={Verify}></Route>
                    </div>
                </div>  
            </div>
        </div>
    )
}