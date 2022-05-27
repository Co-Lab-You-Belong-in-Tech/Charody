import ImgTextBlock from "../ImgTextBlock/imgTextBlock"
import OurStory from '../../static/images/Our story.png'
export default function AboutUs() {
    return(
        <ImgTextBlock
            title='Our Story'
            txt={() => {
                return(
                    <ul>
                        <li>Our small team of four decided to help victims of natural disasters find temporary housing. Currently, Charody is focused on those affected by wildfires in California but we hope to expand to all disasters throughout major cities in the United States.</li>
                        <li>We are focusing on the transitional period when mass shelters are too full and some families cannot return to their homes. These families have difficulty finding a roof to put over their heads until they figure out their next move. We asked ourselves how we could make this transitional period less stressful for the families in this situation.</li>
                    </ul>
                )
            }}
            right={true}
            img={OurStory}
        />
    )
}