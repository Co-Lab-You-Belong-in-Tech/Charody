import { Route, NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import './signUp.css'
import '../components.css'
// components
import Homeowner from './Homeowner/homeowner'
import Official from './Official/official'

export default function SignUp(){
    const { url } = useRouteMatch()
    const activeStyle = { borderBottom: 'solid #26B4F9 2px' }
    return(
        <div className='signUp'>
            <img src='https://via.placeholder.com/200x300'></img>
            <form>
                <div className='navLink'>
                    <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/homeowner`}>Homeowner</NavLink>
                    <NavLink className='navLink' activeStyle={activeStyle}to={`${url}/official`}>Official</NavLink>
                </div>
                <div>
                    <Route path={`${url}/homeowner`} component={Homeowner}/>
                    <Route path={`${url}/official`} component={Official}/>
                </div>
            </form>
        </div>
    )
}