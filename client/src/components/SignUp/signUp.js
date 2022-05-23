import { useState } from 'react'
import './signUp.css'
import '../components.css'
export default function SignUp(){
    const [personnel, setPersonnel] = useState('homeowner')
    return(
        <div className='signUp'>
            <img src='https://via.placeholder.com/200x300'></img>
            <form>
                <div className='radio'>
                    <input type='radio' id='homeowner' name='signupPersonnelSelect' value='homeowner' selected={personnel} onChange={e=>{
                        setPersonnel('homeowner')
                    }}></input>
                    <label for='homeowner'>Homeowner</label>
                    <input type='radio' id='official' name='signupPersonnelSelect' value='official' selected={personnel} onChange={e=>{
                        setPersonnel('official')
                    }}></input>
                    <label for='official'>Disaster Official</label>
                </div>
                <div className='form'>
                    <input placeholder='Email'></input>
                    <input placeholder='Password'></input>
                    <button type='submit' className='buttonColored full'>Create an Account</button>
                </div>
            </form>
        </div>
    )
}