import React, { memo, Fragment } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { TextField } from '@mui/material'

const Bedutilizatinwardcard = () => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="row">
                <div className="col-md-6 pt-1 pb-1">
                    <TextField label="Available Bed Number" size="small" fullWidth /></div>
                <div className="col-md-6 pt-1 pb-1">
                    <TextField label="Number of bed Occupied" size="small" fullWidth /></div>
                <div className="col-md-4 pt-1 pb-1" >
                    <TextField label="No.of Nurses" size="small" /></div>
                <div className="col-md-4 pt-1 pb-1">
                    <TextField label="No.of Patient" size="small" /></div>
                <div className="col-md-4 pt-1 pb-1">
                    <TextField label="Nurse Patient ratio" size="small" /></div>
            </div>
        </Fragment>
    )
}

export default memo(Bedutilizatinwardcard)
