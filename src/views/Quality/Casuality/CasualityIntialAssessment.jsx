import { Card } from '@mui/material'
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useHistory, useParams } from 'react-router';
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'

const CasualityIntialAssessment = () => {
    const { id } = useParams()
    const history = useHistory();
    const tocard = () => {
        history.push(`/Home/CasualitypatientList`)
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />

            <div className="card-body">
                <div className="row"  >
                    <div className="col-md-12  col-sm-12">
                        <div className="card"  >
                            <div className="card-header  text-black " style={{
                                backgroundColor: "#b6b8c3"
                            }}>
                                <h5>Initial Assessment
                                </h5>
                            </div>
                            <Card className="card-body">
                                <div className="row">
                                    <div className="col-md-3 pt-2 pb-2">
                                        <label htmlFor="test" className="form-label">Arrived Time</label>
                                        <TextInput
                                            id="test"
                                            type="datetime-local"
                                            classname="form-control form-control-sm"
                                            Placeholder="Arrived Time"
                                        />
                                    </div>
                                    <div className="col-md-3 pt-2 pb-2">
                                        <label htmlFor="test" className="form-label">Initial Assessment start</label>
                                        <TextInput
                                            id="test"
                                            type="datetime-local"
                                            classname="form-control form-control-sm"
                                            Placeholder="Initial Assessment start"
                                        />
                                    </div>
                                    <div className="col-md-3 pt-2 pb-2">
                                        <label htmlFor="test" className="form-label">Initial Assessment End</label>
                                        <TextInput
                                            id="test"
                                            type="datetime-local"
                                            classname="form-control form-control-sm"
                                            Placeholder="Initial Assessment End"
                                        />
                                    </div>
                                    <div className="col-md-3 pt-2 pb-2">
                                        <label htmlFor="test" className="form-label">Remark</label>
                                        <TextInput
                                            classname="form-control form-control-sm"
                                            Placeholder="Remark" />
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
            </div>
        </Fragment>
    )
}
export default CasualityIntialAssessment
