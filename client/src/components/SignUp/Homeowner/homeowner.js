import { useState } from "react"
import { useHistory } from "react-router"

export default function Homeowner(){
    const history = useHistory()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    return(
        <form className='homeownerForm' onSubmit={e => {
            e.preventDefault()
            history.push('/profileCreation/info')
        }}>
            <input placeholder='Email' onChange={e => {
                setEmail(e.target.value)
            }}></input>
            <input placeholder='Password' onChange={e => {
                setPassword(e.target.value)
            }}></input>
            <button type='submit' className='buttonColored full'>Create an Account</button>
        </form>
    )
}