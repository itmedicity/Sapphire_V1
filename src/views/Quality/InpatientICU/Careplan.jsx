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
import Accodation from '../Inpatient/Accodation'
import CareplanTable from './CareplanTable'

const Careplan = () => {
    const { id } = useParams()
    const [userid, setuserid] = useState({
        us_code: ''
    })
    const [toggle, setToggle] = useState(0)
    const [distrue, setdistrue] = useState(false)
    const [value, setValue] = useState(0)
    //for table data append
    const [careplndata, setCareplndata] = useState(0)

    //useSate for upataion
    const [careplanpdate, setCareplanpdate] = useState(0)
    // tabledata
    const [tabledata, settableData] = useState(
        [{

        }]
    )

    const [careplandata, setcareplandata] = useState({
        careplan: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: ''
    })

    //default state
    const defaultstate = {
        careplan: '',
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
    } = careplandata

    //getting data from the form 
    const updateFormData = (e) => {
        const value = e.target.value
        setcareplandata({ ...careplandata, [e.target.name]: value })
    }
    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        nc_ysno: toggle == 1 ? toggle : 0,
        nc_no: toggle == 2 ? toggle : 0,
        nc_errordesc: errordesc,
        nc_prsnresponsible: personresponsible,
        nc_actntkn: actiontaken,
        nc_remark: remarks,
        user_save_code: userid.us_code
    }

    const postData2 = {
        inpt_slno: id,
        careplan_yn: toggle
    }

    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        nc_ysno: toggle == 1 ? toggle : 0,
        nc_no: toggle == 2 ? toggle : 0,
        nc_errordesc: errordesc,
        nc_prsnresponsible: personresponsible,
        nc_actntkn: actiontaken,
        nc_remark: remarks,
        user_save_code: userid.us_code
    }
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
            if (careplanpdate === 0) {
                const result = await axioslogin.post('/careplan', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result2 = await axioslogin.patch('/careplan/edit', postData2)
                    const { success, message } = result2.data
                    if (success === 2) {
                        succesNofity(message)
                        setdistrue(true)
                        setOpen(false);
                        setcareplandata(defaultstate)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                } else if (success === 2) {
                    warningNofity(message)
                    setOpen(false);
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                    setOpen(false);
                }
            }
            else {
                const result = await axioslogin.patch('/careplan', postDataEdit)
                const { success, message } = result.data
                if (success === 2) {
                    const result2 = await axioslogin.patch('/careplan/edit', postData2)
                    const { success, message } = result2.data
                    if (success === 2) {
                        succesNofity(message)
                        setdistrue(true)
                        setOpen(false);
                        setcareplandata(defaultstate)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                } else if (success === 1) {
                    warningNofity(message)
                    setOpen(false);
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                    setOpen(false);
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
        const careplanerror = async (careplndata) => {
            const result = await axioslogin.get(`careplan/getcareplandetl/${careplndata}}`)
            const { success, data } = result.data
            if (success === 1) {
                const { nc_slno, nc_ysno, nc_remark, nc_errordesc,
                    nc_prsnresponsible, nc_actntkn,
                    nc_no } = data[0]
                const d1 = {
                    nc_slno: nc_slno,
                    nc_ysno: toggle === 1 ? toggle : 0,
                    nc_no: toggle === 2 ? toggle : 0,
                    remarks: nc_remark,
                    errordesc: nc_errordesc,
                    personresponsible: nc_prsnresponsible,
                    actiontaken: nc_actntkn
                }
                setcareplandata(d1)
                if (nc_ysno == 1) {
                    setToggle(nc_ysno)
                }
                else if (nc_no == 2) {
                    setToggle(nc_no)
                }
                else {
                    setToggle(0)
                }
                setCareplanpdate(d1)
            }

        }
        if (careplndata !== 0) {
            careplanerror(careplndata)
        }
    }, [careplndata])



    const editcareplan = () => {
        // setdistrue(false)
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
            {open === true ? <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> : null}
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
                                        // variant="outlined"
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                    >
                                        <MenuItem value='0'>Selected Option</MenuItem>
                                        <MenuItem value='1'>Done</MenuItem>
                                        <MenuItem value='2'>Not Done</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-10 pt-2">
                                {toggle === '2' ? <Actiontaken setfunc={setcareplandata} handover={careplandata} /> : <TextInput
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
                            <CareplanTable settableData={settableData} tabledata={tabledata} setCareplndata={setCareplndata} />

                        </Accodation>
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
