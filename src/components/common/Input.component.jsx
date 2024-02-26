import "./Input.component.css"

const style = {
    display: "flex",
    flexDirection: "column"
}

const Input = ({name, label, type="text", value=undefined, errors=[], onChange=() => {}}) => {
    return (
        <div style={style}>
            <label for={name}>{label}</label>
            <input className="input-component" id={name} name={name} label={label} type={type} onChange={onChange} value={value}></input>
            {errors.map(error => <p style={{color: "red"}}>{error}</p>)}
        </div>
    )
}

export default Input