import { Link } from "react-router-dom";
import './signupConfirmation.css'

import SignUpConfirmationImg from '../../static/images/Homeowner signup verification.png'

export default function SignUpConfirmation(){
    return(
        <div className='signupConfirmation'>
            <h2>Thank you for volunteering to<br/>temporarily host disaster relief victims!</h2>
            <img src={SignUpConfirmationImg}></img>
            <p>Your account has been created and a disaster relief<br/>official will contact you if shelter is needed.</p>
            <Link className='confirmationLink' to='/'>Return to Homepage</Link>
        </div>
    )
}