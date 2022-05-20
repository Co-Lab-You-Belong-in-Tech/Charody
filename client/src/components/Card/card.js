import './card.css'
export default function Card(props){
    const { txt, img } = props
    return(
        <div className='card'>
            <img src={img}></img>
            <p>{txt}</p>
        </div>
    )
}