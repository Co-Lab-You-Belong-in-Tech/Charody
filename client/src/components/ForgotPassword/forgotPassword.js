import ImgTextBlock from "../ImgTextBlock/imgTextBlock";
import ForgotPasswordImg from '../../static/images/Forgot password.png'
import './forgotPassword.css'
import '../components.css'
import { useState } from "react";

export default function ForgotPassword(){
    const [email, setEmail] = useState()
    const [pageContent, setPageContent] = useState(
        <form onSubmit={e => {
            // does something to signify this user forgot their email
            setPageContent(<p>Your password reset has been received. Someone will email you with instructions within <b>2-3 business days</b>.</p>)
        }}>
            <p>Please enter the email address associated with your account for reset information. </p>
            <div>
                <label>Email Address</label>
                <input placeholder='Email' onChange={e => {
                    setEmail(e.target.value)
                }}></input>
            </div>
            <button className='buttonColored full'>Request Reset</button>
        </form>
    )
    return(
        <ImgTextBlock
            txt={() => {
                return(
                    <div className='forgotPasswordForm'>
                        <h2>Forgot Your Password?</h2>
                        {pageContent}
                    </div>
                )
            }}
            left={true}
            img={ForgotPasswordImg}
        />
    )
}