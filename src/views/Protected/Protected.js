import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const Protected = (props) => {

    let Component = props.cmp;
    let history = useHistory();

    useEffect(() => {

        const loginDetl = sessionStorage.getItem('userDetl');
        if (!loginDetl) {
            history.push('/');
        }

    }, [history]);

    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected
