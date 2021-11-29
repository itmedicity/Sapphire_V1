import React, { Fragment } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import { TextField, Card } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Commonfoot from 'src/views/CommonCode/Commonfoot'
import DoctornameSelect from 'src/views/CommonCode/DoctornameSelect'

const Returntoicu = () => {
    const { id } = useParams()

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
                                    <h5>Return To ICU
                                    </h5>
                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-3"></div>
                                        <div className="col-md-6">
                                            <div className="row">

                                                <div className="col-md-6 pl-0">
                                                    <DoctornameSelect
                                                    />
                                                </div>
                                                <div className="col-md-6 pt-2">
                                                    <DatetimeField
                                                        label={"Return to Icu"}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col-md-6 col-sm-12 col-xs-6">
                                                    <TextField
                                                        label="Present Complaints"
                                                        size="small"
                                                        font="small"
                                                        fullWidth
                                                    />
                                                </div>
                                                <div className="col-md-6 col-sm-12 col-xs-6 pt-2">
                                                    <TextField
                                                        label="Previous Complaints"
                                                        size="small"
                                                        font="small"
                                                        fullWidth
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 pt-2 pl-1">
                                                    <TextareaAutosize
                                                        aria-label="Previous Complaints"
                                                        label="Remarks"
                                                        placeholder="Remarks"
                                                        style={{ width: 545, height: 50 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3"></div>
                                    </div>
                                </Card>
                                <Commonfoot />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
}
export default Returntoicu
