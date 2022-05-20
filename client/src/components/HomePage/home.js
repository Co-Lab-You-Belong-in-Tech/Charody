import { Link } from 'react-router-dom'
import './home.css'
export default function Home() {
    return(
        <div>
            <div className='hero'>
                <div>
                    <p>Velit cillum proident ipsum elit ex in ex cupidatat quis ea reprehenderit aliqua. Consequat incididunt cillum dolor do velit ullamco incididunt aliqua ipsum. In elit ea anim minim consectetur ad ipsum in sint ullamco. Reprehenderit exercitation nulla id voluptate adipisicing aute anim dolore id quis mollit aliquip. Amet minim laboris aute et eu aliquip nostrud officia. Ut ullamco aute in labore consectetur quis cupidatat eu cupidatat et laborum consequat.</p>
                    <Link className='link' to='/signUp'>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}