
const style = {
    display: "flex",
    flexDirection: "column"
}

const Input = ({name, label, type="text", errors=[]}) => {
    return (
        <div style={style}>
            <label for={name}>{label}</label>
            <input id={name} name={name} label={label} type={type}></input>
            {errors.map(error => <p style={{color: "red"}}>{error}</p>)}
        </div>
    )
}

export default Input