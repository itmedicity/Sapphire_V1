import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'

import TextInput from '../Component/TextInput'

const Errordesciption = ({ mail }) => {
    return (
        <Fragment>
            <ToastContainer />
            <SessionCheck />
            <div className="col-md-6">

                <TextInput
                    type="text"
                    className="form-control form-control-sm"
                    Placeholder="error description"
                />
            </div>
        </Fragment >
    )
}

export default memo(Errordesciption)
