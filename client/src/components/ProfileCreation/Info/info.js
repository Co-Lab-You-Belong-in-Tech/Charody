import { useState } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { signup } from "../../../features/signup"

export default function Info(props){
    const { url } = props
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()

    return(
        <form onSubmit={e => {
            e.preventDefault()
            dispatch(signup({
                firstName: first,
                lastName: last
            }))
            history.push(`${url}/contact`)
        }}>
            <input placeholder='First Name' onChange={e => {
                setFirst(e.target.value)
            }}></input>
            <input placeholder='Last Name' onChange={e => {
                setLast(e.target.value)
            }}></input>
            <button type='submit'>Next</button>
        </form>
    )
}