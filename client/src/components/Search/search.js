import { useEffect, useRef, useState } from "react"
import { searchListings } from '../../services/listings.js'
import { Parser } from 'json2csv'
import Pagination from 'rc-pagination'
import './search.css'
import '../components.css'
import './pagination.css';

const parser = new Parser()


export default function Search() {
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
  const [totalMatched, setTotalMatch] = useState(0)

  const createSearchCriteria = () => {
    return {
      zipcode: parseInt(fromZip),
      radius: parseInt(miles),
      allowsKids: kidsFilter,
      allowsCats: catsFilter,
      allowsDogs: dogsFilter,
      noStairs: stairsFilter,
      page: page,
      count: 5
    }
  }

  const fetchSearchResults = () => {
    searchListings(createSearchCriteria())
        .then(res => {
            setData(res.results)
            setTotalMatch(res.totalMatched)
        })
        .catch(e => console.log(e))
  }

  useEffect(() => {
    fetchSearchResults()
  }, [page])

  const downloadCSV = () => {
    const searchCriteria = createSearchCriteria();
    searchCriteria.count = 10000;
    searchListings(searchCriteria)
      .then(res => {
        if (res.results[0]) {
          const results = res.results.map(entry => {
            delete entry._id
            return entry
          })
          const csv = parser.parse(results)
          const blob = new Blob([csv], { type: 'text/csv' })
          const url = URL.createObjectURL(blob)
          window.open(url)
        }
      })
      .catch(e => console.log(e))

  }

  const cards = data.map(obj => {
    return (
      <div className='userCard' key={obj._id}>
        <span><b>First Name:</b> {obj.firstName}</span>
        <span><b>Phone:</b> {obj.phone}</span>
        <span><b>Email:</b> {obj.email}</span>
        <span><b>Days Available to Host:</b> {obj.numberOfDaysAvailable}</span>
      </div>
    )
  })
  return (
    <div className='officialSearch'>
      <div>
        <div className='filters'>
          <div>
            <label>Miles from Location</label>
            <div>
              <input placeholder='Miles' onChange={e => {
                setMiles(e.target.value)
              }} />
              <input placeholder='from Zip Code' onChange={e => {
                setFromZip(e.target.value)
              }} />
            </div>
          </div>
          <div>
            <div className='checkboxFilter'>
              <input className='forCheckbox' id='kidsFilter' type='checkbox' onChange={e => {
                setKidsFilter(val => !val)
              }}></input>
              <label htmlFor='kidsFilter'>Accepts Kids?</label>
            </div>
            <div className='checkboxFilter'>
              <input className='forCheckbox' id='dogsFilter' type='checkbox' onChange={e => {
                setDogsFilter(val => !val)
              }}></input>
              <label htmlFor='dogsFilter'>Accepts Dogs?</label>
            </div>
            <div className='checkboxFilter'>
              <input className='forCheckbox' id='catsFilter' type='checkbox' onChange={e => {
                setCatsFilter(val => !val)
              }}></input>
              <label htmlFor='catsFilter'>Accepts Cats?</label>
            </div>
            <div className='checkboxFilter'>
              <input className='forCheckbox' id='stairsFilter' type='checkbox' onChange={e => {
                setStairsFilter(val => !val)
              }}></input>
              <label htmlFor='stairsFilter'>No Stairs?</label>
            </div>
          </div>
          <button className='buttonColored full' onClick={fetchSearchResults}>Search</button>
        </div>
        <div className='searchRightCol'>
          <h2>Search Results</h2>
          <p>We found <b>{'' + totalMatched} results</b> based on your filters.</p>
          <div>
            <button onClick={downloadCSV} className='buttonColored'>Download All Results as CSV</button>
          </div>
          <div className='userCards'>{cards}</div>
        </div>
        <div className='pagiContainer'>
          <Pagination defaultCurrent={1} current={page} pageSize={5} onChange={current => setPage(current)} locale='en-US' total={totalMatched} />
        </div>
      </div>
    </div>
  )
}