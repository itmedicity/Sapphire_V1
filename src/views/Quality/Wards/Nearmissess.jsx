import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import Modelcommon from 'src/views/CommonCode/Modelcommon'

const Nearmissess = () => {
    const { id } = useParams()
    const [toggle, setToggle] = useState(0)
    // const [distrue, setdistrue] = useState(true)
    const [value, setValue] = useState(0)

    //for user validation
    const [userid, setuserid] = useState({
        us_code: ''
    })
    const [nearmissdata, setnearmissdata] = useState({
        nearmisses: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: ''
    })
    //default state
    //default state
    const defaultstate = {
        nearmisses: '',
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
    } = nearmissdata

    //getting data from the form 

    const updateFormData = async (e) => {
        const value = e.target.value
        setnearmissdata({ ...nearmissdata, [e.target.name]: value })
    }
    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        nm_ysno: toggle == 1 ? toggle : 0,
        nm_no: toggle == 2 ? toggle : 0,
        nm_errordesc: errordesc,
        nm_personresponsible: personresponsible,
        nm_actntkn: actiontaken,
        nm_remark: remarks,
        user_code_save: userid.us_code
    }

    const postData2 = {
        inpt_slno: id,
        nearmiss_yn: toggle,
    }

    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        nm_ysno: toggle == 1 ? toggle : 0,
        nm_no: toggle == 2 ? toggle : 0,
        nm_errordesc: errordesc,
        nm_personresponsible: personresponsible,
        nm_actntkn: actiontaken,
        nm_remark: remarks,
        user_code_save: userid.us_code
    }

    // saving form data
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.get(`/common/user/${userid.us_code}`)
        const { success, data, message } = result.data
        if (success === 1) {
            const { us_code } = data[0]
            const frmdataa = {
                us_code: us_code
            }
            setuserid(frmdataa)
            if (value === 0) {
                const result = await axioslogin.post('/nearMisses', postData)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    // setdistrue(true)
                    setOpen(false);
                    setnearmissdata(defaultstate)
                    setToggle(0)

                    const result2 = await axioslogin.patch('/nearMisses/edit', postData2)
                    const { success, message } = result2.data
                    if (success === 2) {
                        succesNofity(message)
                        // setdistrue(true)
                        setOpen(false);
                        setnearmissdata(defaultstate)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                    setnearmissdata(defaultstate)

                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                const result = await axioslogin.patch('/nearMisses', postDataEdit)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    // setdistrue(true)
                    setOpen(false)

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
            errorNofity('Error Occured!!! Please Contact Edp')
        }
    }

    // useEffect(() => {
    //     const nearmisses = async () => {
    //         const result = await axioslogin.get(`nearMisses/${id}`)
    //         const { success, data } = result.data
    //         if (success === 1) {
    //             // setdistrue(true)
    //             const { inpt_slno, nm_ysno, nm_remark, nm_personresponsible, nm_errordesc, nm_actntkn } = data[0]
    //             setToggle(nm_ysno)
    //             const frmData = {
    //                 nearmisses: nm_ysno,
    //                 errordesc: nm_errordesc,
    //                 personresponsible: nm_personresponsible,
    //                 actiontaken: nm_actntkn,
    //                 remarks: nm_remark
    //             }
    //             setnearmissdata(frmData)
    //             setValue(inpt_slno)
    //         }
    //         else if (success === 0) {
    //             // setdistrue(false)
    //             setValue(0)
    //         }
    //         else {
    //             warningNofity("Error Occured!!!Please Contact EDP")
    //         }
    //     }
    //     nearmisses()
    // }, [id])
    // const editnearmisses = () => {
    //     setdistrue(false)
    // }
    // for model close and open
    const [open, setOpen] = useState(false)
    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Fragment>
            <ToastContainer />
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
                                        name="nearmisses"
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
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                    >
                                        <MenuItem value='0'>Selected Option</MenuItem>
                                        <MenuItem value='1'>Reported</MenuItem>
                                        <MenuItem value='2'>Not Reported</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-10 pt-2">
                                {toggle === '2' ? <Actiontaken setfunc={setnearmissdata} handover={nearmissdata}
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
                </Card>
                <div className="card-footer"
                // style={{
                //   backgroundColor: '#b6b8c3',
                // }}
                >
                    <div className="col-md-12">
                        <FooterClosebtn
                        // edit={editnearmisses} 
                        />
                    </div>
                </div>
            </form >
        </Fragment >

    )
}

export default Nearmissess

