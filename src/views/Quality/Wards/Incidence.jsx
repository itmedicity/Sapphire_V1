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

const Incidence = () => {
    const { id } = useParams()

    const [toggle, setToggle] = useState(0)
    const [distrue, setdistrue] = useState(false)
    const [value, setValue] = useState(0)
    //userid check
    const [userid, setuserid] = useState({
        us_code: ''
    })
    //for model
    const [open, setOpen] = useState(false);

    const [incidencedata, setincidencedata] = useState({
        incidence: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: ''
    })
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
        if_ysno: toggle,
        if_errordesc: errordesc,
        if_personresponsible: personresponsible,
        if_actntkn: actiontaken,
        if_remark: remarks,
        user_code_save: userid
    }
    const postData2 = {
        inpt_slno: id,
        incedence_yn: toggle,
    }
    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        if_ysno: toggle,
        if_errordesc: errordesc,
        if_personresponsible: personresponsible,
        if_actntkn: actiontaken,
        if_remark: remarks,
        user_code_save: userid
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin(`/common/user/${userid}`)
        const { success, data, message } = result.data
        if (success === 1) {
            const { us_code } = data[0]
            const frmdataa = {
                us_code: us_code
            }
            setuserid(frmdataa)
            if (value === 0) {
                const result = await axioslogin.post('/incidencefall', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result2 = await axioslogin.patch('/incidencefall/edit', postData2)
                    const { success, message } = result2.data
                    if (success === 2) {
                        succesNofity(message)
                        setdistrue(true)
                        setOpen(false);
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                    // setsentinentdata(defaultstate)
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
                    setdistrue(true)
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
        const incidence = async () => {
            const result = await axioslogin.get(`incidencefall/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setdistrue(true)
                const { inpt_slno, if_ysno, if_errordesc, if_personresponsible, if_actntkn, if_remark } = data[0]
                // setToggle(if_ysno)
                const frmData = {
                    errordesc: if_errordesc,
                    personresponsible: if_personresponsible,
                    actiontaken: if_actntkn,
                    remarks: if_remark
                }
                setincidencedata(frmData)
                setValue(inpt_slno)
                setToggle(if_ysno)
            }
            else if (success === 0) {
                setdistrue(false)
                setValue(0)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        incidence()
    }, [id])

    const editincidence = () => {
        setdistrue(false)
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
            <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} />
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
                                        disabled={distrue}
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
                                {toggle === '2' ? <Actiontaken setfunc={setincidencedata} handover={incidencedata} distrue={distrue} /> : <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Remarks"
                                    value={remarks}
                                    name="remarks"
                                    disabled={distrue}
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
                        <FooterClosebtn
                            edit={editincidence} />
                    </div>
                </div>
            </form>
        </Fragment>

    )
}

export default Incidence
