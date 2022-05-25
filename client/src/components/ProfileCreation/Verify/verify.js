import { useSelector } from 'react-redux'
import './verify.css'

import Info from '../Info/info'
import Home from '../Home/home'

export default function Verify() {
    const data = useSelector(state => state.signup.value)
    return(
        <div className='verifyForm'>
            <Info/>
            <Home/>
            <button onClick={e => {
                // sends const data to database
            }}>Done</button>
        </div>
    )
}