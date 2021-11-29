import React, { Fragment, memo } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import PatientCard from '../Inpatient/PatientCard'
import { TextField, Card } from '@mui/material'
import Commonfoot from 'src/views/CommonCode/Commonfoot'


const InitialassesmentDoctor = () => {
    const { id } = useParams()
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card col-md-12" style={{ backgroundColor: "#e8eaf6" }} >
                <div className="card-body">
                    <div className="row"  >
                        <div className="col-md-3 col-sm-12" >
                            {/* passing id to patient card componet */}
                            <PatientCard id={id} />
                        </div>
                        <div className="col-md-9  col-sm-12">
                            <div className="card"  >
                                <div className="card-header  text-black " style={{
                                    backgroundColor: "#b6b8c3"
                                }}>
                                    <h5>Initial Assessment Doctor
                                    </h5>
                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 pt-2">
                                            <DatetimeField
                                                label="Arrivel Time in Bed"
                                            />
                                        </div>
                                        <div className="col-md-3 pt-2">
                                            <DatetimeField
                                                label="Initial Assessement Start Time"
                                            />
                                        </div>
                                        <div className="col-md-3 pt-2">
                                            <DatetimeField
                                                label="Initial Assessement End Time"
                                            />
                                        </div>
                                        <div className="col-md-3 pt-2">
                                            <TextField label="Remarks"
                                                size="small" />
                                        </div>
                                    </div>
                                </Card>

                                <Commonfoot id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default memo(InitialassesmentDoctor)
