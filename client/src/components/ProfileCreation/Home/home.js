import { useState } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { signup } from "../../../features/signup"

export default function Home(props){
    const { url } = props
    const [kids, setKids] = useState(false)
    const [dogs, setDogs] = useState(false)
    const [cats, setCats] = useState(false)
    const [stairs, setStairs] = useState(false)
    const [hosting, setHosting] = useState(false)
    const [hostDays, setHostDays] = useState(-1)
    const history = useHistory()
    const dispatch = useDispatch()

    const convertTF = val => val=='on' ? true : false
    return(
        <form onSubmit={e => {
            e.preventDefault()
            dispatch(signup({
                accessibility: {
                    kids: kids,
                    cats: cats,
                    dogs: dogs,
                    stairs: stairs
                },
                days: hostDays,
                hosting: hosting
            }))
            history.push(`${url}/verify`)
        }}>
            <label>
                <p>Do you accept kids?</p>
                <input type='checkbox' onChange={e => setKids(convertTF(e.target.value))}></input>
            </label>
            <label>
                <p>Do you accept dogs?</p>
                <input type='checkbox' onChange={e => setDogs(convertTF(e.target.value))}></input>
            </label>
            <label>
                <p>Do you accept cats?</p>
                <input type='checkbox' onChange={e => setCats(convertTF(e.target.value))}></input>
            </label>
            <label>
                <p>Do you have stairs?</p>
                <input type='checkbox' onChange={e => setStairs(convertTF(e.target.value))}></input>
            </label>
            <label>
                <p>Are you currently available to host?</p>
                <input type='checkbox' onChange={e => setHosting(convertTF(e.target.value))}></input>
            </label>
            <label>
                <p>How many days can you host?<br/>Minimum 3 days, maximum 30 days</p>
                <input placeholder='number' onChange={e => setHostDays(e.target.value)}></input>
            </label>
            <button type='submit'>Next</button>
        </form>
    )
}