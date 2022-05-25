import { useState } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { signup } from "../../../features/signup"

export default function Contact(props){
    const { url } = props
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [zip, setZip] = useState(-1)
    const history = useHistory()
    const dispatch = useDispatch()

    return(
        <form onSubmit={e => {
            e.preventDefault()
            dispatch(signup({
                phone: phone,
                email: email,
                zipCode: zip
            }))
            history.push(`${url}/home`)
        }}>
            <input placeholder='Number (XXX) XXX - XXXX' onChange={e => {
                setPhone(e.target.value)
            }}></input>
            <input placeholder='Email example@gmail.com' onChange={e => {
                setEmail(e.target.value)
            }}></input>
            <input placeholder='Zip Code' onChange={e => {
                setZip(e.target.value)
            }}></input>
            <button type='submit'>Next</button>
        </form>
    )
}