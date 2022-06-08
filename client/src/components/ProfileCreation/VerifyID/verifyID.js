import { FileUploader } from 'react-drag-drop-files'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from "../../../features/signup"
import { useHistory } from "react-router"

import './verifyID.css'
import '../../components.css'
export default function VerifyID(props){
    const { url } = props
    const dispatch = useDispatch()
    const data = useSelector(state => state.signup.value)
    const history = useHistory()
    return(
        <form className='verifyIDForm' onSubmit={e => {
            e.preventDefault()
            history.push(`${url}/verify`)
        }}>
            <FileUploader
                handleChange={file => dispatch(signup({ files: [...data.files, file] }))}
                types={["JPEG", "PNG", "PNG", "JPG"]}
                children={
                    <div className='dropzone'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM223 263C213.7 272.4 213.7 287.6 223 296.1C232.4 306.3 247.6 306.3 256.1 296.1L296 257.9V392C296 405.3 306.7 416 320 416C333.3 416 344 405.3 344 392V257.9L383 296.1C392.4 306.3 407.6 306.3 416.1 296.1C426.3 287.6 426.3 272.4 416.1 263L336.1 183C327.6 173.7 312.4 173.7 303 183L223 263z"/></svg>
                        <div>Drag and drop your files or</div>
                        <button className='buttonColored invert'>Browse Files</button>
                    </div>
                }
            />
            <div className='fileList'>{data.files.map(file => {
                return(
                    <div>
                        <p>{file.name}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" onClick={e => {
                            dispatch(signup({ files: [...data.files].filter(ele => ele.name!=file.name) }))
                        }}/></svg>
                    </div>
                )
            })}</div>
            <button type='submit' className='next'>Next</button>
        </form>
    )
}