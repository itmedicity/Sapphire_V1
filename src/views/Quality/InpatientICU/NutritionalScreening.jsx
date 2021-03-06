import React, { Fragment, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useParams } from 'react-router'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import Modelcommon from 'src/views/CommonCode/Modelcommon'

const NutritionalScreening = () => {
    const { id } = useParams()
    const [toggle, setToggle] = useState(0)
    const [distrue, setdistrue] = useState(true)
    const [value, setValue] = useState(0)
    const [userid, setuserid] = useState({
        us_code: ''
    })

    const [nutritionalScreeningdata, setnutritionalScreeningdata] = useState(
        {
            nutritionalScreening: '',
            errordesc: '',
            personresponsible: '',
            actiontaken: '',
            remarks: ''
        })
    //default state
    // const defaultstate = {
    //     nutritionalScreening: '',
    //     errordesc: '',
    //     personresponsible: '',
    //     actiontaken: '',
    //     remarks: ''
    // }
    //destrutring object
    const {

        errordesc,
        personresponsible,
        actiontaken,
        remarks
    } = nutritionalScreeningdata

    //getting data from the form 

    const updateFormData = (e) => {
        const value = e.target.value
        setnutritionalScreeningdata({ ...nutritionalScreeningdata, [e.target.name]: value })
    }


    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        ns_ysno: toggle,
        ns_errordesc: errordesc,
        ns_personresponsible: personresponsible,
        ns_actntkn: actiontaken,
        ns_remark: remarks,
        user_code_save: userid,

    }

    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        ns_ysno: toggle,
        ns_errordesc: errordesc,
        ns_personresponsible: personresponsible,
        ns_actntkn: actiontaken,
        ns_remark: remarks,
        user_code_save: userid,

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
                const result = await axioslogin.post('/nutritionalScreening', postData)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setdistrue(true)
                    setOpen(false)
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                const result = await axioslogin.patch('/nutritionalScreening', postDataEdit)
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
        const nutriscreening = async () => {
            const result = await axioslogin.get(`nutritionalScreening/${id}`)

            const { success, data } = result.data
            if (success === 1) {
                setdistrue(true)
                const { inpt_slno, ns_ysno, ns_remark, ns_personresponsible, ns_errordesc, ns_actntkn } = data[0]
                setToggle(ns_ysno)
                const frmData = {
                    nutritionalScreening: ns_ysno,
                    errordesc: ns_errordesc,
                    personresponsible: ns_personresponsible,
                    actiontaken: ns_actntkn,
                    remarks: ns_remark
                }
                setnutritionalScreeningdata(frmData)
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
        nutriscreening()
    }, [id])

    const editnutritionalscreening = () => {
        setdistrue(false)
    }

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
                                        name="nutritionalScreening"
                                        value={toggle}
                                        size="small"
                                        id="demo-simple-select"
                                        onChange={(e) => { setToggle(e.target.value) }}
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
                                {toggle === '2' ? <Actiontaken setfunc={setnutritionalScreeningdata} handover={nutritionalScreeningdata} distrue={distrue} /> : <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Remarks"
                                    value={remarks}
                                    name="remarks"
                                    changeTextValue={(e) => updateFormData(e)}
                                    disabled={distrue}
                                />
                                }

                            </div>
                        </div>
                    </div>
                </Card>

                <div className="card-footer" >
                    <div className="col-md-12">
                        <FooterClosebtn
                            edit={editnutritionalscreening} />
                    </div>
                </div>
            </form>
        </Fragment >
    )
}

export default NutritionalScreening
