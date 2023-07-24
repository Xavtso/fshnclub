import '../styles/Button.css'

export default function Button(props) {
    return (
        <div className={`custom-button  ${props.side}`} >{props.text }</div>
    )
}