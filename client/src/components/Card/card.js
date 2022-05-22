import './card.css'
export default function Card(props){
    const { title, txt, img } = props
    return(
        <div className='card'>
            <img src={img}></img>
            <div>
                <h2>{title}</h2>
                <p>{txt}</p>
            </div>
        </div>
    )
}