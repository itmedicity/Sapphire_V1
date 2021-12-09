import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { useHistory, useParams } from 'react-router'
import { Card } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'

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

                                        <div className="col-md-2 ">
                                            <label htmlFor="test" className="form-label">Discharge Advice Time</label>
                                        </div>
                                        <div className="col-md-3">

                                            <TextInput
                                                id="test"
                                                type="datetime-local"
                                                classname="form-control form-control-sm"

                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="test" className="form-label">Discharge Summary Received Time</label>
                                        </div>
                                        <div className="col-md-3">

                                            <TextInput
                                                id="test"
                                                type="datetime-local"
                                                classname="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-2">
                                            <label htmlFor="test" className="form-label">Summary Prepare Time</label>
                                        </div>
                                        <div className="col-md-3">

                                            <TextInput
                                                id="test"
                                                type="datetime-local"
                                                classname="form-control form-control-sm"
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="test" className="form-label">Summary HandOver to Patient</label>
                                        </div>
                                        <div className="col-md-3">

                                            <TextInput
                                                id="test"
                                                type="datetime-local"
                                                classname="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-2">
                                            <label htmlFor="test" className="form-label">Date of Discharge</label>
                                        </div>
                                        <div className="col-md-3">

                                            <TextInput
                                                id="test"
                                                type="datetime-local"
                                                classname="form-control form-control-sm"
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="test" className="form-label">Patient leaving from the unit</label>
                                        </div>
                                        <div className="col-md-3">

                                            <TextInput
                                                id="test"
                                                type="datetime-local"
                                                classname="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>

                                </Card>
                                <div className="card-footer text-muted" style={{
                                    backgroundColor: "#b6b8c3"
                                }}>
                                    <FooterClosebtn

                                    //redirect={RedirectToProfilePage}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div >
            </div >
        </Fragment >
    )
}
export default Discharge
