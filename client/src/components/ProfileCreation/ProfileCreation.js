import { Route, NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import '../components.css'
import './profileCreation.css'

// components
import Info from './Info/info'
import Home from './Home/home'
import Verify from './Verify/verify'
import VerifyID from './VerifyID/verifyID'

import ProfileCreationImg from '../../static/images/account sign up.jpg'

export default function ProfileCreation(){
    const { url } = useRouteMatch()
    const activeStyle = { color: '#26B4F9' }
    return(
        <div className='profileCreation'>
            <img src={ProfileCreationImg}></img>
            <div>
                <h2>
                    Thank you for taking the step to volunteer!<br/>
                    Hosting helps evacuees transition better.
                </h2>
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