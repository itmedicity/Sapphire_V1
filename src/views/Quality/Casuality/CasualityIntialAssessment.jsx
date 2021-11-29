import { Card, TextField } from '@mui/material'
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import { useHistory, useParams } from 'react-router';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

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
                            <div className="card-footet  text-black" style={{ backgroundColor: "#b6b8c3" }} >
                                <SaveIcon style={{ color: "#558b2f", float: "left", width: "43", height: "43", paddingLeft: "5px" }} />
                                <EditIcon style={{ color: "#000000", float: "left", width: "43", height: "43", paddingLeft: "5px" }} />
                                <CancelIcon style={{ color: "#d50000", float: "left", width: "43", height: "43", paddingLeft: "5px" }} onClick={tocard} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CasualityIntialAssessment
