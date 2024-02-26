const RadioGroup = ({ name, title, onChange, options, value, onShow }) => {
    return (
        <div>
            <p>{title}</p>
            {options.map(de => <div key={name + "_" + de.id}>
                <input
                    name={name}
                    checked={value === de.id}
                    onChange={() => onChange(de.id)} id={name + "_" + de.id}
                    type="radio"></input>
                <label htmlFor={name + "_" + de.id}>
                    {onShow != null ? onShow(de) : de.name}
                </label>
            </div>)}
        </div>
    )
}

export default RadioGroup;