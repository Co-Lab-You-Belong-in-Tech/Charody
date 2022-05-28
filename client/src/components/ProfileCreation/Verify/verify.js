import { useSelector } from 'react-redux'
import './verify.css'
import '../../components.css'

import Info from '../Info/info'
import Home from '../Home/home'
import { signupStateToPostData } from '../../../utils/mungeProfileData.js'
import { upsertProfile } from '../../../services/profiles.js'

export default function Verify() {
    const data = useSelector(state => state.signup.value)
    return(
        <div className='verifyForm'>
            <Info/>
            <Home/>
            <button className='buttonColored full done' onClick={e => {
                const mungedData = signupStateToPostData(data);
                console.log(mungedData)
                console.log('this ran')
                upsertProfile(mungedData)
                // TODO: redirect to a ty page or something
            }}>Done</button>
        </div>
    )
}