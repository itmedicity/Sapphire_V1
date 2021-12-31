import React from 'react'

const TextInput = (props) => {

    const { type, Placeholder, classname,
        changeTextValue, id, name, value, disabled, max, min
    } = props;
    return (
        <div>
            <input
                type={type}
                className={classname}
                placeholder={Placeholder}
                aria-label=".form-control-sm"
                id={id}
                name={name}
                value={value}
                onChange={changeTextValue}
                disabled={disabled}
                min={min}
                max={max}
            />
        </div>
    )
}

export default TextInput
