import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'
import { TextField } from '@mui/material'

const Errordesciption = ({ mail }) => {
    return (
        <Fragment>
            <ToastContainer />
            <SessionCheck />
            <div class="col-md-6">
                <TextField
                    label="Error description"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    value={mail}
                />
            </div>
        </Fragment >
    )
}

export default memo(Errordesciption)
