import { useState } from "react"
import { useHistory } from "react-router"
export default function Home(){
    const [kids, setKids] = useState(false)
    const [dogs, setDogs] = useState(false)
    const [cats, setCats] = useState(false)
    const [stairs, setStairs] = useState(false)
    const [hosting, setHosting] = useState(false)
    const [hostDays, setHostDays] = useState(-1)
    const History = useHistory()
    const uploadInfo = () => {
    
    }

    return(
        <form className='signupHome'>
            <label>
                <p>Do you accept kids?</p>
                <input type='checkbox' onChange={e => setKids(e.target.value)}></input>
            </label>
            <label>
                <p>Do you accept dogs?</p>
                <input type='checkbox' onChange={e => setDogs(e.target.value)}></input>
            </label>
            <label>
                <p>Do you accept cats?</p>
                <input type='checkbox' onChange={e => setCats(e.target.value)}></input>
            </label>
            <label>
                <p>Do you have stairs?</p>
                <input type='checkbox' onChange={e => setStairs(e.target.value)}></input>
            </label>
            <label>
                <p>Are you currently available to host?</p>
                <input type='checkbox' onChange={e => setHosting(e.target.value)}></input>
            </label>
            <label>
                <p>How many days can you host?<br/>Minimum 3 days, maximum 30 days</p>
                <input placeholder='number' onChange={e => setHostDays(e.target.value)}></input>
            </label>
            <button type='submit'>Next</button>
        </form>
    )
}