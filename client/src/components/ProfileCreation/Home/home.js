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
            <div>
                <input type='checkbox' id='kids' onChange={e => setKids(convertTF(e.target.value))}></input>
                <label for='kids' className='forCheckbox'>Do you accept kids?</label>
            </div>
            <div>
                <input type='checkbox' id='dogs' onChange={e => setDogs(convertTF(e.target.value))}></input>
                <label for='dogs' className='forCheckbox'>Do you accept dogs?</label>
            </div>
            <div>
                <input type='checkbox' id='cats' onChange={e => setCats(convertTF(e.target.value))}></input>
                <label for='cats' className='forCheckbox'>Do you accept cats?</label>
            </div>
            <div>
                <input type='checkbox' id='stairs' onChange={e => setStairs(convertTF(e.target.value))}></input>
                <label for='stairs' className='forCheckbox'>Do you have stairs?</label>
            </div>
            <div>
                <input type='checkbox' id='availibility' onChange={e => setHosting(convertTF(e.target.value))}></input>
                <label for='availibility' className='forCheckbox'>Are you currently available to host?</label>
            </div>
            <label>
                <p>How many days can you host?<br/>Minimum 3 days, maximum 30 days</p>
                <input placeholder='number' onChange={e => setHostDays(e.target.value)}></input>
            </label>
            <button type='submit'>Next</button>
        </form>
    )
}