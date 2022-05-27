import ImgTextBlock from "../ImgTextBlock/imgTextBlock";
import ForgotPasswordImg from '../../static/images/Forgot password.png'
import './forgotPassword.css'
import '../components.css'

export default function ForgotPassword(){
    return(
        <ImgTextBlock
            txt={() => {
                return(
                    <div className='forgotPasswordForm'>
                        <h2>Forgot Your Password?</h2>
                        <p>Please enter the email address associated with your account for reset information. </p>
                        <form>
                            <div>
                                <label>Email Address</label>
                                <input placeholder='Email'></input>
                            </div>
                            <button className='buttonColored full'>Request Reset</button>
                        </form>
                    </div>
                )
            }}
            left={true}
            img={ForgotPasswordImg}
        />
    )
}