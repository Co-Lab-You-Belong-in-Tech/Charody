import './imgTextBlock.css'
export default function ImgTextBlock(props){
    const { title, txt, img, left, right } = props
    const imgRight = () => {
        return(
            <div>
                <div>{txt()}</div>
                <img src={img}></img>
            </div>
        )
    }
    const imgLeft = () => {
        return(
            <div>
                <img src={img}></img>
                <div>{txt()}</div>
            </div>
        )
    }
    const position = right ? imgRight() : left ? imgLeft() : imgRight()
    return(
        <div className='imgTextBlock'>
            <h1>{title}</h1>
            {position}
        </div>
    )
}