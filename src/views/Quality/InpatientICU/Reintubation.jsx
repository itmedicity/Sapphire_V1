import React, { Fragment, useState } from 'react'
import PatientCard from '../Inpatient/PatientCard'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import Commonfoot from 'src/views/CommonCode/Commonfoot'
import { Card, TextField, Stack } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'



const Reintubation = () => {
    const [value, setValue] = useState(new Date());

    const { id } = useParams()




    const handleChange = (newValue) => {
        setValue(newValue);
    };



    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card col-md-12" style={{ backgroundColor: "#e8eaf6" }} >
                <div className="card-body">
                    <div className="row"  >
                        <div className="col-md-3 col-sm-12" >
                            <PatientCard id={id} />
                        </div>
                        <div className="col-md-9  col-sm-12">
                            <div className="card"  >
                                <div className="card-header  text-black " style={{
                                    backgroundColor: "#b6b8c3"
                                }}>
                                    <h5>ReIntubation Rate
                                    </h5>
                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <Stack>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <DateTimePicker
                                                                label="Intubation"
                                                                value={value}
                                                                onChange={handleChange}
                                                                renderInput={(params) => <TextField {...params} size="small" />}
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <DateTimePicker
                                                                label="Extubation"
                                                                onChange={
                                                                    handleChange}
                                                                renderInput={(params) => <TextField {...params} size="small" />}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4 pt-3">
                                                            <DateTimePicker
                                                                label="ReIntubation"
                                                                value={value}
                                                                onChange={handleChange}
                                                                renderInput={(params) => <TextField {...params} size="small" />}
                                                            />
                                                        </div>
                                                        <div className="col-md-4 pt-3">
                                                            <DateTimePicker
                                                                label="ReExtubation"
                                                                value={value}
                                                                onChange={handleChange}
                                                                renderInput={(params) => <TextField {...params} size="small" />}
                                                            />
                                                        </div>
                                                    </div>
                                                </LocalizationProvider>
                                            </Stack>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                </Card>
                                <Commonfoot id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
}
export default Reintubation



