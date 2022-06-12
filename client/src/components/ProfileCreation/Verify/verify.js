import { useSelector } from 'react-redux'
import './verify.css'
import '../../components.css'

import Info from '../Info/info'
import Home from '../Home/home'
import VerifyID from '../VerifyID/verifyID'
import { signupStateToPostData } from '../../../utils/mungeProfileData.js'
import { upsertProfile } from '../../../services/profiles.js'
import { useHistory } from 'react-router-dom'

export default function Verify() {
    const history = useHistory()
    const data = useSelector(state => state.signup.value)
    return(
        <div className='verifyForm'>
            <Info/>
            <Home/>
            <VerifyID/>
            <button className='buttonColored full done' onClick={e => {
                console.log('--------verify data--------: ' + JSON.stringify(data, null, 4))
                const mungedData = signupStateToPostData(data);
                console.log(mungedData)
                console.log('this ran')
                upsertProfile(mungedData)
                history.push("/signupConfirmation")
            }}>Done</button>
        </div>
    )
}