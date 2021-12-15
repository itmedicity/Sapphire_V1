import React from 'react'

const TextInput = (props) => {

    const { type, Placeholder, classname,
        changeTextValue, id, value, name
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
            />
        </div>
    )
}

export default TextInput
