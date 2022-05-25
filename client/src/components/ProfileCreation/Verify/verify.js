import { useSelector } from 'react-redux'

export default function Verify() {
    const data = useSelector(state => state.signup.value)
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    )
}