import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../../features/signup"

export default function Info(props){
    const { url } = props
    const data = useSelector(state => state.signup.value)
    const history = useHistory()
    const dispatch = useDispatch()

    return(
        <form className='infoForm' onSubmit={e => {
            e.preventDefault()
            history.push(`${url}/home`)
        }}>
            <div className='usernameFields'>
                <div className='formField'>
                    <label for='firstNameInput'>First Name</label>
                    <input id='firstNameInput' type='text' placeholder='First Name' value={data.firstName} onChange={e => {
                        dispatch(signup({ firstName: e.target.value }))
                    }}></input>
                </div>
                <div className='formField'>
                    <label for='lastNameInput'>Last Name</label>
                    <input id='lastNameInput'type='text' placeholder='Last Name' value={data.lastName} onChange={e => {
                        dispatch(signup({ lastName: e.target.value }))
                    }}></input>
                </div>
            </div>
            <div className='formField'>
                <label for='phoneInput'>Number</label>
                <input id='phoneInput' type='tel' placeholder='Number (XXX) XXX - XXXX' value={data.phone} onChange={e => {
                    dispatch(signup({ phone: e.target.value }))
                }}></input>
            </div>
            <div className='formField'>
                <label for='zipInput'>Number</label>
                <input id='zipInput' type='number' placeholder='Zip Code' value={data.zipCode} onChange={e => {
                    dispatch(signup({ zipCode: e.target.value }))
                }}></input>
            </div>
            <button type='submit' className='next'>Next</button>
        </form>
    )
}