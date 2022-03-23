import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import Modelcommon from 'src/views/CommonCode/Modelcommon'
import IncidencefallTable from './IncidencefallTable'
import Accodation from '../Inpatient/Accodation'


const Incidence = () => {
    const { id } = useParams()
    const [toggle, setToggle] = useState(0)
    // const [distrue, setdistrue] = useState(false)
    const [value, setValue] = useState(0)
    //userid check
    const [userid, setuserid] = useState({
        us_code: ''
    })

    // for table data append
    const [incedecedata, setincedecedata] = useState(0)

    // usestate for updation

    const [incedeceupdate, setincedeceupdate] = useState(0)

    //tabledata
    const [tabledata, settableData] = useState([
        {
            if_slno: '',
            if_currentdate: '',
            if_ysno: '',
            if_no: ''
        }
    ])




    //for model
    const [open, setOpen] = useState(false);
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
    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        if_ysno: toggle == 1 ? toggle : 0,
        if_no: toggle == 2 ? toggle : 0,
        if_errordesc: errordesc,
        if_personresponsible: personresponsible,
        if_actntkn: actiontaken,
        if_remark: remarks,
        user_code_save: userid.us_code
    }
    const postData2 = {
        inpt_slno: id,
        incedence_yn: toggle,
    }
    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        if_ysno: toggle == 1 ? toggle : 0,
        if_no: toggle == 2 ? toggle : 0,
        if_errordesc: errordesc,
        if_personresponsible: personresponsible,
        if_actntkn: actiontaken,
        if_remark: remarks,
        user_code_save: userid.us_code
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.get(`/common/user/${userid.us_code}`)
        const { success, data, message } = result.data
        if (success === 1) {
            const { user_slno } = data[0]
            const frmdataa = {
                us_code: user_slno
            }
            setuserid(frmdataa)
            if (incedeceupdate === 0) {
                const result = await axioslogin.post('/incidencefall', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result2 = await axioslogin.patch('/incidencefall/edit', postData2)
                    const { success, message } = result2.data
                    if (success === 2) {
                        succesNofity(message)
                        setincidencedata(defaultstate)
                        // setdistrue(true)
                        setOpen(false);
                        setToggle(0)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                const result = await axioslogin.patch('/incidencefall', postDataEdit)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setOpen(false)
                    setincidencedata(defaultstate)
                } else if (success === 1) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
        }
        else if (success === 0) {
            warningNofity(message)
        }
        else {
            errorNofity('Error occured!!! Plaese Contact Edp')
        }
    }
    useEffect(() => {
        const incidence = async (incedecedata) => {
            const result = await axioslogin.get(`incidencefall/getincidencedetl/${incedecedata}}`)
            const { success, data } = result.data
            if (success === 1) {
                const { if_slno, if_ysno, if_remark,
                    if_errordesc,
                    if_personresponsible,
                    if_actntkn,
                    if_no } = data[0]
                const d1 = {
                    if_slno: if_slno,
                    if_ysno: toggle === 1 ? toggle : 0,
                    if_no: toggle === 2 ? toggle : 0,
                    remarks: if_remark,
                    errordesc: if_errordesc,
                    personresponsible: if_personresponsible,
                    actiontaken: if_actntkn,
                }

                setincidencedata(d1)
                if (if_ysno == 1) {
                    setToggle(if_ysno)
                } else if (if_no == 2) {
                    setToggle(if_no)
                } else {
                    setToggle(0)
                }
                setincedeceupdate(d1)
            }
        }
        if (incedecedata !== 0) {
            incidence(incedecedata)
        }
    }, [incedecedata])

    const editincidence = () => {
        // setdistrue(false)
    }
    //for model
    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            {open === true ? <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> : null}
            {/* <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> */}
            <form onSubmit={handleClickOpen}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2 pt-2">
                                <FormControl
                                    fullWidth
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
                                        // disabled={distrue}
                                        fullWidth
                                        variant="outlined"
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}>
                                        <MenuItem value='0'>Selected Option</MenuItem>
                                        <MenuItem value='1'>Done</MenuItem>
                                        <MenuItem value='2'>Not Done</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-10 pt-2">
                                {toggle === '2' ? <Actiontaken setfunc={setincidencedata} handover={incidencedata}
                                // distrue={distrue}
                                /> : <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Remarks"
                                    value={remarks}
                                    name="remarks"
                                    // disabled={distrue}
                                    changeTextValue={(e) => updateFormData(e)}
                                />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 pt-2 pl-0">
                        <Accodation style={{
                            background: '#EEF4F7',
                            height: '10%',
                        }}>
                            <IncidencefallTable settableData={settableData} tabledata={tabledata} setincedecedata={setincedecedata} />

                        </Accodation>
                    </div>
                </Card>
                <div className="card-footer" >
                    <div className="col-md-12">
                        <FooterClosebtn
                            edit={editincidence} />
                    </div>
                </div>
            </form>
        </Fragment>

    )
}

export default Incidence
