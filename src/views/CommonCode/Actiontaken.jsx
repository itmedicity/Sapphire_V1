import { TextField } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'

const Actiontaken = () => {
    return (
        <Fragment>
            <ToastContainer />
            <SessionCheck />
            <div className="col-md-6 pt-1">
                <TextField
                    label="Error description"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    name="Error description"

                />
            </div>
            <div className="col-md-3 pt-1">
                <TextField
                    label="Person Responsible"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    name="Person Responsible"

                />
            </div>
            <div className="col-md-5 pt-1 ">
                <TextField
                    label="Action Taken"
                    fullWidth
                    size="small"
                    autoComplete="off"
                    variant="outlined"

                />
            </div>


        </Fragment>
    )
}

export default memo(Actiontaken)