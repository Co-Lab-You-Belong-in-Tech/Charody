import './homeowner.css'
import { useHistory } from "react-router"

export default function Homeowner(){
    const history = useHistory()
    return(
        <form onSubmit={e => {
            e.preventDefault()
            console.log('submitted')
            history.push('/profileCreation/info')
        }}>
            <input placeholder='Email'></input>
            <input placeholder='Password'></input>
            <button type='submit' className='buttonColored full'>Create an Account</button>
            <div>
                <div className='dash'></div>
                OR
                <div className='dash'></div>
            </div>
            <button className='buttonColored invert'>Sign Up With Google</button>
            <button className='buttonColored invert'>Sign Up With Facebook</button>
        </form>
    )
}