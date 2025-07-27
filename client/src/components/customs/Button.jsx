export default function Button({ onClick, checked }) {

    return <label className="switch" >
        <input type="checkbox" checked={checked} onChange={onClick} />
        <span className="slider"></span>
    </label>

}