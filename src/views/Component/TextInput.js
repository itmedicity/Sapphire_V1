import React from 'react'

const TextInput = (props) => {

    const { type, Placeholder, classname,
        changeTextValue, name, id, value
    } = props;
    return (
        <div>
            <input
                type={type}
                className={classname}
                placeholder={Placeholder}
                aria-label=".form-control-sm"
                id={id}
                value={value}
                onChange={changeTextValue}
                name={name}
            />
        </div>
    )
}

export default TextInput
