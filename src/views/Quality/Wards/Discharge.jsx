import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { useParams } from 'react-router'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import Commonfoot from 'src/views/CommonCode/Commonfoot'
import { Card } from '@mui/material'

const Discharge = () => {
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
                                    <h5>Discharge
                                    </h5>

                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-1"></div>
                                        <div className="col-md-10">
                                            <div className="row pl-5">
                                                <div className="col-md-3 p-2 ml-4">
                                                    <DatetimeField
                                                        label="Discharge Advice Time"
                                                    />
                                                </div>
                                                <div className="col-md-3 p-2 ml-4">
                                                    <DatetimeField
                                                        label="Summary Prepared Time"
                                                    />
                                                </div>
                                                <div className="col-md-3 p-2 ml-4">
                                                    <DatetimeField
                                                        label="Discharge Summary Received Time"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row pl-5">
                                                <div className="col-md-3 p-2 ml-4">
                                                    <DatetimeField
                                                        label="Summary HandOver to the Patient time"
                                                    />
                                                </div>
                                                <div className="col-md-3 p-2 ml-4">
                                                    <DatetimeField
                                                        label="Patient leaving from the unit"
                                                    />
                                                </div>
                                                <div className="col-md-3 p-2 ml-4">
                                                    <DatetimeField
                                                        label="Date of Discharge"
                                                    />
                                                </div>

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
        </Fragment>
    )
}
export default Discharge
