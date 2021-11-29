import { Card, TextField } from '@mui/material'
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import DoctornameSelect from 'src/views/CommonCode/DoctornameSelect'
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router'

const ReturntoCasuality = () => {
    const history = useHistory();
    const toback = () => {
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
                                <h5>Return To ICU
                                </h5>
                            </div>
                            <Card className="card-body">
                                <div className="row">
                                    <div className="col-md-3 pl-0">
                                        <DoctornameSelect
                                        />
                                    </div>
                                    <div className="col-md-3 pt-1">
                                        <DatetimeField
                                            label="Return Date/Time"
                                        />
                                    </div>
                                    <div className="col-md-3 pt-1">
                                        <TextField
                                            label="Present Complaints"
                                            size="small"
                                            font="small"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="col-md-3 pt-1">
                                        <TextField
                                            label="Present Complaints"
                                            size="small"
                                            font="small"
                                            fullWidth
                                        />
                                    </div>
                                </div>

                            </Card>
                            <div className="card-footet  text-black" style={{ backgroundColor: "#b6b8c3" }} >
                                <SaveIcon style={{ color: "#558b2f", float: "left", width: "43", height: "43", paddingLeft: "5px" }} />
                                <EditIcon style={{ color: "#000000", float: "left", width: "43", height: "43", paddingLeft: "5px" }} />
                                <CancelIcon style={{ color: "#d50000", float: "left", width: "43", height: "43", paddingLeft: "5px" }} onClick={toback} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Fragment>
    )
}
export default ReturntoCasuality
