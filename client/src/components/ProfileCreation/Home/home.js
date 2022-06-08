import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../../features/signup"

export default function Home(props){
    const { url } = props
    const data = useSelector(state => state.signup.value)
    const history = useHistory()
    const dispatch = useDispatch()

    return(
        <form className='homeForm' onSubmit={e => {
            e.preventDefault()
            history.push(`${url}/verifyID`)
        }}>
            <div>
                <input type='checkbox' id='kids' checked={data.accessibility.kids} onChange={e => {
                    dispatch(signup({ accessibility: {
                        kids: !data.accessibility.kids,
                        cats: data.accessibility.cats,
                        dogs: data.accessibility.dogs,
                        stairs: data.accessibility.stairs
                    } }))
                }}></input>
                <label for='kids' className='forCheckbox'>Do you accept kids?</label>
            </div>
            <div>
                <input type='checkbox' id='dogs' checked={data.accessibility.dogs} onChange={e => {
                    dispatch(signup({ accessibility: {
                        kids: data.accessibility.kids,
                        cats: data.accessibility.cats,
                        dogs: !data.accessibility.dogs,
                        stairs: data.accessibility.stairs
                    } }))
                }}></input>
                <label for='dogs' className='forCheckbox'>Do you accept dogs?</label>
            </div>
            <div>
                <input type='checkbox' id='cats' checked={data.accessibility.cats} onChange={e => {
                    dispatch(signup({ accessibility: {
                        kids: data.accessibility.kids,
                        cats: !data.accessibility.cats,
                        dogs: data.accessibility.dogs,
                        stairs: data.accessibility.stairs
                    } }))
                }}></input>
                <label for='cats' className='forCheckbox'>Do you accept cats?</label>
            </div>
            <div>
                <input type='checkbox' id='stairs' checked={data.accessibility.stairs} onChange={e => {
                    dispatch(signup({ accessibility: {
                        kids: data.accessibility.kids,
                        cats: data.accessibility.cats,
                        dogs: data.accessibility.dogs,
                        stairs: !data.accessibility.stairs
                    } }))
                }}></input>
                <label for='stairs' className='forCheckbox'>Do you have stairs?</label>
            </div>
            <div>
                <input type='checkbox' id='availibility' checked={data.hosting} onChange={e => {
                    dispatch(signup({ hosting: !data.hosting }))
                }}></input>
                <label for='availibility' className='forCheckbox'>Are you currently available to host?</label>
            </div>
            <label>
                <p>How many days can you host?<br/>Minimum 3 days, maximum 30 days</p>
                <input type='number' placeholder='number' className='daysInput' value={data.days} onChange={e => dispatch(signup({ days: e.target.value }))}></input>
            </label>
            <button type='submit' className='next'>Next</button>
        </form>
    )
}