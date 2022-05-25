import { useSelector } from 'react-redux'

export default function DisplayInfo() {
    const data = useSelector(state => state.signup.value)
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    )
}