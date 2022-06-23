import { useSelector } from 'react-redux'
import Info from '../Info/info'
import Home from '../Home/home'
import VerifyID from '../VerifyID/verifyID'
import { signupStateToPostData } from '../../../utils/mungeProfileData.js'
import { upsertProfile } from '../../../services/profiles.js'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import './verify.css'
import '../../components.css'

export default function Verify() {
    const [message, setMessage] = useState("")
    const history = useHistory()
    const data = useSelector(state => state.signup.value)
    return(
        <div className='verifyForm'>
            <Info/>
            <Home/>
            <VerifyID/>
            <button className='buttonColored full done' onClick={async (e) => {
                const mungedData = signupStateToPostData(data);
                try {
                    const res = await upsertProfile(mungedData)
                    if(res?.ok) {
                        history.push("/signupConfirmation")
                    } else {
                        setMessage("Could not submit profile, please verify that all of your information is correct.")
                    }
                } catch (e) {
                    setMessage("An error occurred. Please try again.")
                }
            }}>Done</button>
            {message && <span>{message}</span>}
        </div>
    )
}