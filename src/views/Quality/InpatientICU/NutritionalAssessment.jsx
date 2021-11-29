import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import Commonfoot from 'src/views/CommonCode/Commonfoot'


const NutritionalAssessment = () => {
    const { id } = useParams()
    const [state, changeState] = useState("Nill")
    const [toggle, setToggle] = useState(false)

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
                                    <h5>Nutritional Assessment
                                    </h5>
                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-10 row">
                                            <div className="col-md-3">
                                                <FormControl
                                                    fullWidth
                                                    margin="dense"
                                                    className="mt-1"
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        size="small"
                                                        label="Nutritional Assessment"
                                                        id="demo-simple-select"
                                                        onChange={(e) => { setToggle(e.target.value) }}
                                                    >
                                                        <MenuItem value='0'>Selected Option</MenuItem>
                                                        <MenuItem value='1'>Yes</MenuItem>
                                                        <MenuItem value='2'>No</MenuItem>
                                                    </Select>
                                                    <InputLabel id="demo-simple-select">Nutritional Assessment</InputLabel>
                                                </FormControl>
                                            </div>
                                            {toggle === '1' ? <Actiontaken mail={state} /> : null}
                                            <div className="col-md-7 pt-1">
                                                <TextField fullWidth label="Remarks"
                                                    size="small" />
                                            </div>
                                        </div>
                                        <div className="col-md-1"></div>
                                    </div>
                                </Card>
                                <Commonfoot />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default NutritionalAssessment
