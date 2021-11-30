import React, { Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import PatientCard from '../Inpatient/PatientCard'
import { useHistory, useParams } from 'react-router'
import { InputLabel, Select, TextField, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
// import Commonfoot from 'src/views/CommonCode/Commonfoot'
const Careplan = () => {
    const { id } = useParams()
    // const [state, changeState] = useState()
    const [toggle, setToggle] = useState(false)
    const history = useHistory();
    const RedirectToProfilePage = () => {
        history.push('/Home/Inpatienlist')

    }

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
                                    <h5>Care Plan </h5>
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
                                                    <InputLabel id="test-select-label">Care Plan document</InputLabel>
                                                    <Select
                                                        labelId="test-select-label"
                                                        label={"Care Plan document"}
                                                        size="small"
                                                        id="demo-simple-select"
                                                        onChange={(e) => { setToggle(e.target.value) }}
                                                    >
                                                        <MenuItem value='0'>Selected Option</MenuItem>
                                                        <MenuItem value='1'>Complete</MenuItem>
                                                        <MenuItem value='2'>Incomplete</MenuItem>
                                                    </Select>
                                                </FormControl>

                                            </div>
                                            {toggle === '2' ? <Actiontaken /> : null
                                            }
                                            <div className="col-md-7 pt-1">
                                                <TextField fullWidth label="Remarks"
                                                    size="small" />
                                            </div>
                                        </div>
                                        <div className="col-md-1"></div>
                                    </div>
                                </Card>
                                <div className="card-footer text-muted">
                                    <FooterClosebtn

                                        redirect={RedirectToProfilePage}
                                    />
                                </div>
                                {/* <Commonfoot id={id} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Careplan
