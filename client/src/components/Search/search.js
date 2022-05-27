import { useEffect, useRef, useState } from "react"
import './search.css'
import '../components.css'

export default function Search(){
    const [data, setData] = useState([])
    const dataRef = useRef()
    // useStates
    const [miles, setMiles] = useState()
    const [fromZip, setFromZip] = useState()
    const [kidsFilter, setKidsFilter] = useState(false)
    const [dogsFilter, setDogsFilter] = useState(false)
    const [catsFilter, setCatsFilter] = useState(false)
    const [StairsFilter, setStairsFilter] = useState(false)
    useEffect(() => {
        // obtains data from database
        setData([
            {
                _id: 'uniqueID1',
                firstName: 'user1',
                lastName: 'user1.last',
                phone: '1234567890',
                zipCode: '12345',
                accessibility: {
                    kids: true,
                    cats: false,
                    dogs: false,
                    stairs: false
                },
                days: '1',
                hosting: false,
                email: 'something@gmail.com'
            },
            {
                _id: 'uniqueID2',
                firstName: 'user2',
                lastName: 'user2.last',
                phone: '2345678901',
                zipCode: '23451',
                accessibility: {
                    kids: true,
                    cats: true,
                    dogs: false,
                    stairs: false
                },
                days: '2',
                hosting: true,
                email: 'johnDoe@gmail.com'
            },
            {
                _id: 'uniqueID3',
                firstName: 'user3',
                lastName: 'user3.last',
                phone: '3456789012',
                zipCode: '34512',
                accessibility: {
                    kids: true,
                    cats: true,
                    dogs: true,
                    stairs: false
                },
                days: '3',
                hosting: false,
                email: 'test@gmail.com'
            }
        ])
    }, [])
    const cards = data.map(obj => {
        return(
            <div className='userCard'>
                <h3>User: {obj.firstName}</h3>
                <p>Phone: {obj.phone}</p>
                <p>Email: {obj.email}</p>
                <p>Days Available to Host: {obj.days}</p>
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
                <button className='buttonColored full'>Filter</button>
            </div>
            <div className='userCards'>{cards}</div>
        </div>
    )
}