import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.js'

import styles from './AdminIdReview.module.css'
import { getIdReview, postReview } from '../../services/idReview.js'

export default function AdminIdReview() {
  const { user } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [idData, setIdData] = useState({})

  const loadData = useCallback(() => {
    if(!loading) {
      setLoading(true)
      getIdReview()
      .then(res => {
        setIdData(res)
        setLoading(false)
        setLoaded(true)
      })
      .catch(e => console.log(e))
    }
  }, [loading])

  const handleApprove = () => {
    postReview(true, idData.userId)
    .then(() => loadData())
    .catch(e => console.log(e))
  }

  const handleDeny = () => {
    postReview(false, idData.userId)
    .then(() => loadData())
    .catch(e => console.log(e))
  }
  
  useEffect(() => {
    if(user?._id) {
      if(!user.isAdmin) {
        history.push("/search")
      } else {
        if(!loaded) {
          loadData()
        }
      }
    }
  }, [user, history, loading, loaded, loadData])

  if(!loaded || !idData?.idUrl) {
    return <h3>Loading...</h3>
  }

  return (
    <div className={styles.idReview}>
      <h3>Name User Signed Up With: {idData.firstName} {idData.lastName}</h3>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          Provided ID
          <img src={idData.idUrl} />
        </div>
        <div className={styles.imageContainer}>
          Provided Image of Face
          <img src={idData.selfieUrl} />
        </div>
      </div>
      <div>
        <button onClick={handleApprove} className='buttonColored'>Approve</button>
        <button onClick={handleDeny} className='buttonColored'>Deny</button>
        <button onClick={loadData} className='buttonColored'>Skip</button>
      </div>
    </div>
  )
}
