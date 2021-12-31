import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'

const Careplan = () => {
    const { id } = useParams()

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
    //default state
    const defaultstate = {
        careplan: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: '',
    }
    //destrutring object
    const {
        careplan,
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
        nc_remark: remarks

    }
    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        nc_ysno: toggle,
        nc_errordesc: errordesc,
        nc_prsnresponsible: personresponsible,
        nc_actntkn: actiontaken,
        nc_remark: remarks
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        if (value === 0) {
            const result = await axioslogin.post('/careplan', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setdistrue(true)

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

            } else if (success === 1) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
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
                // style={{
                //   backgroundColor: '#b6b8c3',
                // }}
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
