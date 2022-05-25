import { useState } from "react"
import { useHistory } from "react-router"
export default function Contact(){
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [zip, setZip] = useState(-1)
    const History = useHistory()
    const uploadInfo = () => {

    }
    return(
        <form>
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