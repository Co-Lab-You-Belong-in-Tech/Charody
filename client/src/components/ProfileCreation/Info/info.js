import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../../features/signup"

export default function Info(props){
    const { url } = props
    const data = useSelector(state => state.signup.value)
    const history = useHistory()
    const dispatch = useDispatch()

    return(
        <form onSubmit={e => {
            e.preventDefault()
            history.push(`${url}/home`)
        }}>
            <input placeholder='First Name' value={data.firstName} onChange={e => {
                dispatch(signup({ firstName: e.target.value }))
            }}></input>
            <input placeholder='Last Name' value={data.lastName} onChange={e => {
                dispatch(signup({ lastName: e.target.value }))
            }}></input>
            <input placeholder='Number (XXX) XXX - XXXX' value={data.phone} onChange={e => {
                dispatch(signup({ phone: e.target.value }))
            }}></input>
            <input placeholder='Zip Code' value={data.zipCode} onChange={e => {
                dispatch(signup({ zipCode: e.target.value }))
            }}></input>
            <button type='submit' className='next'>Next</button>
        </form>
    )
}