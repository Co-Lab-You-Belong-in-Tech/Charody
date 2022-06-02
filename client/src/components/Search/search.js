import { useEffect, useRef, useState } from "react"
import './search.css'
import '../components.css'
import { searchListings } from '../../services/listings.js'

export default function Search(){
    const [data, setData] = useState([])
    const dataRef = useRef()
    // useStates
    const [miles, setMiles] = useState()
    const [fromZip, setFromZip] = useState()
    const [kidsFilter, setKidsFilter] = useState(false)
    const [dogsFilter, setDogsFilter] = useState(false)
    const [catsFilter, setCatsFilter] = useState(false)
    const [stairsFilter, setStairsFilter] = useState(false)
    const [page, setPage] = useState(1)

    const fetchSearchResults = () => {
        const searchCriteria = {
            zipcode: parseInt(fromZip),
            radius: parseInt(miles),
            allowKids: kidsFilter,
            allowsCats: catsFilter,
            allowsDogs: dogsFilter,
            noStairs: stairsFilter,
            page: page
        }
        const ac = new AbortController()
        searchListings(searchCriteria, ac.signal)
            .then(res => {
                console.log(res)
                setData(res)
            }).catch(e => console.log(e))

    }

    const cards = data.map(obj => {
        return(
            <div className='userCard' key={obj._id}>
                <h3>User: {obj.firstName}</h3>
                <p>Phone: {obj.phone}</p>
                <p>Email: {obj.email}</p>
                <p>Days Available to Host: {obj.numberOfDaysAvailable}</p>
            </div>
        )
    })
    return(
        <div className='officialSearch'>
            <div className='filters'>
                <div>
                    <label>Miles from Location</label>
                    <div>
                        <input placeholder='Miles' onChange={e => {
                            setMiles(e.target.value)
                        }}/>
                        <input placeholder='from Zip Code' onChange={e => {
                            setFromZip(e.target.value)
                        }}/>
                    </div>
                </div>
                <div>
                    <div className='checkboxFilter'>
                        <input className='forCheckbox' id='kidsFilter' type='checkbox' onChange={e => {
                            setKidsFilter(val => !val)
                        }}></input>
                        <label for='kidsFilter'>Accepts Kids?</label>
                    </div>
                    <div className='checkboxFilter'>
                        <input className='forCheckbox' id='dogsFilter' type='checkbox' onChange={e => {
                            setDogsFilter(val => !val)
                        }}></input>
                        <label for='dogsFilter'>Accepts Dogs?</label>
                    </div>
                    <div className='checkboxFilter'>
                        <input className='forCheckbox' id='catsFilter' type='checkbox' onChange={e => {
                            setCatsFilter(val => !val)
                        }}></input>
                        <label for='catsFilter'>Accepts Cats?</label>
                    </div>
                    <div className='checkboxFilter'>
                        <input className='forCheckbox' id='stairsFilter' type='checkbox' onChange={e => {
                            setStairsFilter(val => !val)
                        }}></input>
                        <label for='stairsFilter'>No Stairs?</label>
                    </div>
                </div>
                <button className='buttonColored full' onClick={fetchSearchResults}>Filter</button>
            </div>
            <div className='userCards'>{cards}</div>
        </div>
    )
}