import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'
import Modelcommon from 'src/views/CommonCode/Modelcommon'

const Careplan = () => {
    const { id } = useParams()
    const [userid, setuserid] = useState({
        us_code: ''
    })

    const [toggle, setToggle] = useState(0)

    const [distrue, setdistrue] = useState(false)
    const [value, setValue] = useState(0)

    const [careplandata, setcareplandata] = useState({
        careplan: '',
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
    } = careplandata

    //getting data from the form 

    const updateFormData = (e) => {
        const value = e.target.value
        setcareplandata({ ...careplandata, [e.target.name]: value })
    }

    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        nc_ysno: toggle,
        nc_errordesc: errordesc,
        nc_prsnresponsible: personresponsible,
        nc_actntkn: actiontaken,
        nc_remark: remarks,
        user_save_code: userid

    }

    const postData2 = {
        inpt_slno: id,
        careplan_yn: toggle,
    }

    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        nc_ysno: toggle,
        nc_errordesc: errordesc,
        nc_prsnresponsible: personresponsible,
        nc_actntkn: actiontaken,
        nc_remark: remarks,
        user_save_code: userid
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.get(`/common/user/${userid}`)
        const { success, data, message } = result.data
        if (success === 1) {
            const { us_code } = data[0]
            const frmdataa = {
                us_code: us_code
            }
            setuserid(frmdataa)

            if (value === 0) {
                const result = await axioslogin.post('/careplan', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result2 = await axioslogin.patch('/careplan/edit', postData2)
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

                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                const result = await axioslogin.patch('/careplan', postDataEdit)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setdistrue(true)
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
            errorNofity('Error Occured!!! Please Contact EDP')
        }
    }
    useEffect(() => {
        const careplann = async () => {
            const result = await axioslogin.get(`careplan/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setdistrue(true)
                const { inpt_slno, nc_ysno, nc_remark, nc_errordesc, nc_prsnresponsible, nc_actntkn } = data[0]
                setToggle(nc_ysno)
                const frmData = {
                    careplan: nc_ysno,
                    errordesc: nc_errordesc,
                    personresponsible: nc_prsnresponsible,
                    actiontaken: nc_actntkn,
                    remarks: nc_remark
                }
                setcareplandata(frmData)
                setValue(inpt_slno)
            }
            else if (success === 0) {
                setdistrue(false)
                setValue(0)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        careplann()
    }, [id])
    const editcareplan = () => {
        setdistrue(false)
    }
    // for model close and open 
    const [open, setOpen] = useState(false);

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
            <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} />
            <ToastContainer />
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
                                        name="careplan"
                                        value={toggle}
                                        size="small"
                                        id="demo-simple-select"
                                        onChange={(e) => { setToggle(e.target.value) }}
                                        fullWidth
                                        disabled={distrue}
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
                                {toggle === '2' ? <Actiontaken setfunc={setcareplandata} handover={careplandata} distrue={distrue} /> : <TextInput
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
                >
                    <div className="col-md-12">
                        <FooterClosebtn
                            edit={editcareplan} />
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
export default Careplan
