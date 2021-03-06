import { FileUploader } from 'react-drag-drop-files'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from "../../../features/signup"
import { useHistory } from "react-router"

import './verifyID.css'
import '../../components.css'
import { useState } from 'react'
import { uploadId, uploadSelfie } from '../../../services/files.js'
import { apiUrl } from '../../../utils/apiUrl.js'
import { Circles } from  'react-loader-spinner'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { nanoid } from '@reduxjs/toolkit'

export default function VerifyID(props){
    const { url } = props
    const dispatch = useDispatch()
    const data = useSelector(state => state.signup.value)
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState('')

    return(
        <form className='verifyIDForm' onSubmit={e => {
            e.preventDefault()
        }}>
            <div className='idInputBox'>
                {!data.files.id.loaded ? 
                    <FileUploader
                        handleChange={async (file) => {
                            const newFiles = {
                                ...data.files,
                                id: {
                                    loaded: false,
                                    loading: true,
                                    url: null
                                }
                            }
                            dispatch(signup({ files: newFiles }))
                            try {
                                await uploadId(file)
                                const newFiles = {
                                    ...data.files,
                                    id: {
                                        loaded: true,
                                        loading: false,
                                        url: `${apiUrl}/files/id?dummy=${nanoid()}`
                                    }
                                }
                                dispatch(signup({ files: newFiles }))
                            } catch(e) {
                                setErrorMessage(e.message)
                                const newFiles = {
                                    ...data.files,
                                    id: {
                                        loaded: false,
                                        loading: false,
                                        url: null
                                    }
                                }
                                dispatch(signup({ files: newFiles }))
                            }
                        }}
                        types={["JPEG", "PNG", "JPG"]}
                        children={
                            <div className='dropzone'>
                                { data.files.id.loading ? (
                                    <Circles color="#00BFFF" height={80} width={80}/>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z"/></svg>
                                        <div>Drag and drop <span>the front of your ID</span> or</div>
                                        <button className='buttonColored invert'>Browse Files</button>
                                    </>
                                )}
                            </div>
                        }
                    />
                :
                    <div className='reviewFile'>
                        {data.files.id.loaded && <img src={data.files.id.url} />}
                        <div className='delFile'>
                            <p>{data.files.id.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" onClick={e => {
                                const newFiles = {
                                    ...data.files,
                                    id: {
                                        loaded: false,
                                        loading: false,
                                        url: null
                                    }
                                }
                                dispatch(signup({ files: newFiles }))
                            }}/></svg>
                        </div>
                    </div>
                }
            </div>
            <div className='selfieInputBox'>
                {!data.files.photo.loaded ? 
                    <FileUploader
                        handleChange={async (file) => {
                            const newFiles = {
                                ...data.files,
                                photo: {
                                    loaded: false,
                                    loading: true,
                                    url: null
                                }
                            }
                            dispatch(signup({ files: newFiles }))
                            try {
                                await uploadSelfie(file)
                                const newFiles = {
                                    ...data.files,
                                    photo: {
                                        loaded: true,
                                        loading: false,
                                        url: `${apiUrl}/files/selfie?dummy=${nanoid()}`
                                    }
                                }
                                dispatch(signup({ files: newFiles }))
                            } catch(e) {
                                setErrorMessage(e.message)
                                const newFiles = {
                                    ...data.files,
                                    photo: {
                                        loaded: false,
                                        loading: false,
                                        url: null
                                    }
                                }
                                dispatch(signup({ files: newFiles }))
                            }
                        }}
                        types={["JPEG", "PNG", "JPG"]}
                        children={
                            <div className='dropzone'>
                                { data.files.photo.loading ? (
                                    <Circles color="#00BFFF" height={80} width={80}/>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z"/></svg>
                                        <div>Drag and drop <span>a photo of your face</span> or</div>
                                        <button className='buttonColored invert'>Browse Files</button>
                                    </>
                                )}
                            </div>
                        }
                    />
                :
                    <div className='reviewFile'>
                        {data.files.photo.loaded && <img src={data.files.photo.url} />}
                        <div className='delFile'>
                            <p>{data.files.photo.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" onClick={e => {
                                const newFiles = {
                                    ...data.files,
                                    photo: {
                                        loaded: false,
                                        loading: false,
                                        url: null
                                    }
                                }
                                dispatch(signup({ files: newFiles }))
                            }}/></svg>
                        </div>
                    </div>
                }
            </div>
            <button
                type='submit'
                className='next'
                onClick={e => {
                    e.preventDefault()
                    history.push(`${url}/verify`)
                }}
                disabled={!data.files.id.loaded || !data.files.photo.loaded}
            >
                Next
            </button>
        </form>
    )
}