import React, { memo, Fragment } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { TextField } from '@mui/material'

const Bedoccupancycard = () => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="row">
                <div className="col-md-3 pt-1 pb-1">
                    <TextField label="Available Bed Number" size="small" /></div>
                <div className="col-md-3 pt-1 pb-1">
                    <TextField label="No.of bed Occupied" size="small" /></div>
                <div className="col-md-3 pt-1 pb-1" >
                    <TextField label="No.of Nurses" size="small" /></div>
                <div className="col-md-3 pt-1 pb-1">
                    <TextField label="No.of Patient" size="small" /></div>
            </div>
            <div className="row">
                <div className="col-md-6 pt-1 pb-1">
                    <TextField label="No.of ventilated Nurse Patient Ratio" size="small" fullWidth /></div>
                <div className="col-md-6 pt-1 pb-1">
                    <TextField label="No.of nonventilated Nurse Patient Ratio" size="small" fullWidth />
                </div>

            </div>
        </Fragment >
    )
}

export default memo(Bedoccupancycard)
