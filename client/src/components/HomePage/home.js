import { Link } from 'react-router-dom'
import Card from '../Card/card'
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
            <div className='howItWorks'>
                <h1>How It Works</h1>
                <div className='cards'>
                    <Card 
                        img='https://via.placeholder.com/150'
                        txt='Exercitation cupidatat quis ad dolor elit est dolore pariatur proident adipisicing ea.'
                    />
                    <Card 
                        img='https://via.placeholder.com/150'
                        txt='Exercitation cupidatat quis ad dolor elit est dolore pariatur proident adipisicing ea.'
                    />
                    <Card 
                        img='https://via.placeholder.com/150'
                        txt='Exercitation cupidatat quis ad dolor elit est dolore pariatur proident adipisicing ea.'
                    />
                </div>
            </div>
            <div className='benefits'>
                <h1>Benefits of Volunteering</h1>
                <div>
                    <ul>
                        <li>Magna qui ex deserunt commodo ullamco mollit est amet eiusmod quis elit laborum ex ut. Et aliqua elit dolor est deserunt sunt exercitation Lorem ut amet incididunt est. Do duis quis ut exercitation dolor occaecat in nisi incididunt exercitation velit cillum in occaecat. Est aute ad nulla dolore labore duis.</li>
                        <li>Magna qui ex deserunt commodo ullamco mollit est amet eiusmod quis elit laborum ex ut. Et aliqua elit dolor est deserunt sunt exercitation Lorem ut amet incididunt est. Do duis quis ut exercitation dolor occaecat in nisi incididunt exercitation velit cillum in occaecat. Est aute ad nulla dolore labore duis.</li>
                    </ul>
                    <img src='https://via.placeholder.com/500'></img>
                </div>
            </div>
        </div>
    )
}