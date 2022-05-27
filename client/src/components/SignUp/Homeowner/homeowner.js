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
        </form>
    )
}