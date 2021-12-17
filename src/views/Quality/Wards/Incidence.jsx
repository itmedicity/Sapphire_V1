import React, { Fragment, useState } from 'react'
import PatientCard from '../Inpatient/PatientCard'
import { useHistory, useParams } from 'react-router'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'

const Incidence = () => {
    const { id } = useParams()
    const classes = useStyles()
    const [toggle, setToggle] = useState(0)
    const history = useHistory()
    const [incidencedata, setincidencedata] = useState({
        incidence: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: ''
    })
    //default state
    const defaultstate = {
        incidence: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: ''
    }

    //destrutring object
    const {
        incidence,
        errordesc,
        personresponsible,
        actiontaken,
        remarks
    } = incidencedata

    //getting data from the form 

    const updateFormData = async (e) => {
        const value = e.target.value
        setincidencedata({ ...incidencedata, [e.target.name]: value })
    }
    const RedirectToProfilePage = () => {
        history.push(`/Home/InpatientEdit/${id}`)
    }
    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        if_ysno: toggle,
        if_errordesc: errordesc,
        if_personresponsible: personresponsible,
        if_actntkn: actiontaken,
        if_remark: remarks
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/incidencefall', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setincidencedata(defaultstate)
        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form onSubmit={submitFormData}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2 pt-2">
                                <FormControl
                                    margin="dense"
                                    className="mt-1"
                                >
                                    <Select
                                        labelId="test-select-label"
                                        name="incidence"
                                        value={toggle}
                                        size="small"
                                        id="demo-simple-select"
                                        onChange={(e) => {
                                            setToggle(e.target.value)
                                            // sethandoverdata(e.target.value)
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                    >
                                        <MenuItem value='0'>Selected Option</MenuItem>
                                        <MenuItem value='1'>Done</MenuItem>
                                        <MenuItem value='2'>Not Done</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-10 pt-2">
                                {toggle === '2' ? <Actiontaken setfunc={setincidencedata} /> : <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Remarks"
                                    value={remarks}
                                    name="remarks"
                                    changeTextValue={(e) => updateFormData(e)}
                                />
                                }

                            </div>
                        </div>
                    </div>
                </Card>
                <div className="card-footer"
                // style={{
                //   backgroundColor: '#b6b8c3',
                // }}
                >
                    <div className="col-md-12">
                        <FooterClosebtn />
                    </div>
                </div>
            </form>
        </Fragment>

    )
}

export default Incidence
