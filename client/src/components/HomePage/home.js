// component imports
import { Link } from 'react-router-dom'
import Card from '../Card/card'
import ImgTextBlock from '../ImgTextBlock/imgTextBlock'
import Footer from '../Footer/footer'
import './home.css'
import '../components.css'
// image imports
import heroSection from '../../static/images/Hero section.jpeg'
import step1 from '../../static/images/Step 1 pic.png'
import step2 from '../../static/images/step 2 pic.png'
import step3 from '../../static/images/Step 3 host.png'

import impactYouMake from '../../static/images/Dog mom.jpg'
import aboutYourGuest from '../../static/images/guest.png'
import volunteer from '../../static/images/Volunteer.png'
export default function Home() {
    return(
        <div className='homePage'>
            <div className='hero overlay'>
                <img src={heroSection} alt=''></img>
                <div>
                    <h1>Temporary housing<br/>Forever grateful</h1>
                    <p>Help victims of natural disasters by providing<br/>short term shelter</p>
                    <Link className='grayButton' to='/signUp/homeowner'>Sign Up</Link>
                </div>
            </div>
            <div className='howItWorks'>
                <h1>How It Works</h1>
                <div className='cards'>
                    <div>
                        <img src={step1} alt=''></img>
                        <img src={step2} alt=''></img>
                        <img src={step3} alt=''></img>
                    </div>
                    <div>
                        <Card 
                            title='Step 1'
                            txt='Homeowners can create an account by providing basic personal information, home details, and ID and photo for verification. Edits can be made by logging in through the Charody site.'
                        />
                        <Card 
                            title='Step 2'
                            txt='If a disaster occurs and housing is needed, verified partner organizations will be given access to search through Charody’s volunteer homeowners to contact. '
                        />
                        <Card 
                            title='Step 3'
                            txt='Based on the information the partner organization shares of the victims, homeowners can choose how many to host and for how long, but no longer than 30 days.'
                        />
                    </div>
                </div>
                
            </div>
            <ImgTextBlock
                title='The impact you make'
                txt={() => {
                    return(
                        <figure>
                            <blockquote>It was hard to get shelter to fit my physical needs and where my dog would be accepted.  So many volunteers through Charody offered to help us.  I stayed with one host for a few weeks and another for a month until I was able to find a new home after ours got burned from a wildfire.</blockquote>
                            <figcaption>-Sarah C.</figcaption>
                        </figure>
                    )
                }}
                left={true}
                img={impactYouMake}
            />
            <ImgTextBlock
                title='About your guests'
                txt={() => {
                    return(
                        <ul className='checked'>
                            <li>Verified identity and victim of a natural disaster.</li>
                            <li>Will be assigned and in touch with a caseworker.</li>
                            <li>Will not get your contact information.</li>
                            <li>Will stay for the days you’re willing to host.</li>
                        </ul>
                    )
                }}
                right={true}
                img={aboutYourGuest}
            />
            <ImgTextBlock
                title='Why volunteer?'
                txt={() => {
                    return(
                        <div className='whyVolunteer'>
                            <ul className='checked'>
                                <li>Help people transition back to their lives.</li>
                                <li>Build relationships with officials and guests.</li>
                                <li>Make impact and be a part of a social cause.</li>
                            </ul>
                            <Link className='buttonColored' to='/signUp/homeowner'>Be a Host</Link>
                        </div>
                    )
                }}
                left={true}
                img={volunteer}
            />
            <Footer/>
        </div>
    )
}