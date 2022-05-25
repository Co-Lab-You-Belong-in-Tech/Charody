import { Route, NavLink } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import '../components.css'
import './profileCreation.css'

// components
import Info from './Info/info'
import Contact from './Contact/contact'
import Home from './Home/home'
import Verify from './Verify/verify'

export default function ProfileCreation(){
    const { url } = useRouteMatch()
    const activeStyle = { borderBottom: 'solid #26B4F9 2px' }
    return(
        <div className='profileCreation'>
            <img src='https://via.placeholder.com/400x350'></img>
            <div>
                <h2>
                    Thank you for taking the step to volunteer!<br/>
                    Hosting helps evacuees transition better.
                </h2>
                <div>
                    <div className='navLink'>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/info`} url={url}>Info</NavLink>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/contact`} url={url}>Contact</NavLink>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/home`} url={url}>Home</NavLink>
                        <NavLink className='navLink' activeStyle={activeStyle} to={`${url}/verify`} url={url}>Verify</NavLink>
                    </div>
                    <div>
                        <Route path={`${url}/info`}><Info url={url}/></Route>
                        <Route path={`${url}/contact`}><Contact url={url}/></Route>
                        <Route path={`${url}/home`}><Home url={url}/></Route>
                        <Route path={`${url}/verify`} component={Verify}></Route>
                    </div>
                </div>  
            </div>
        </div>
    )
}