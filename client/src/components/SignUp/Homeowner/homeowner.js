import './homeowner.css'
export default function Homeowner(){
    return(
        <form>
            <input placeholder='Email'></input>
            <input placeholder='Password'></input>
            <button type='submit' className='buttonColored full'>Create an Account</button>
            <div>
                <div></div>
                OR
                <div></div>
            </div>
            <button className='buttonColored invert'>Sign Up With Google</button>
            <button className='buttonColored invert'>Sign Up With Facebook</button>
        </form>
    )
}