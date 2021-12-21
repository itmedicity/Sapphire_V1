import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams, useHistory } from 'react-router'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Nearmissess = () => {
    const { id } = useParams()
    const classes = useStyles()
    const [toggle, setToggle] = useState(0)
    const history = useHistory()
    const [distrue, setdistrue] = useState(false)
    const RedirectToProfilePage = () => {
        history.push(`/Home/InpatientEdit/${id}`)
    }
    const [nearmissdata, setnearmissdata] = useState({
        nearmisses: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: ''
    })
    useEffect(() => {
        const nearmisses = async () => {
            const result = await axioslogin.get(`nearMisses/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setdistrue(true)
                const { nm_ysno, nm_remark, nm_personresponsible, nm_errordesc, nm_actntkn } = data[0]
                setToggle(nm_ysno)
                const frmData = {
                    nearmisses: nm_ysno,
                    errordesc: nm_errordesc,
                    personresponsible: nm_personresponsible,
                    actiontaken: nm_actntkn,
                    remarks: nm_remark
                }
                setnearmissdata(frmData)
            }
        }
        nearmisses()
    }, [id])
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
        nearmisses,
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
        nm_ysno: toggle,
        nm_errordesc: errordesc,
        nm_personresponsible: personresponsible,
        nm_actntkn: actiontaken,
        nm_remark: remarks
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/nearMisses', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setdistrue(true)
            //setnearmissdata(defaultstate)

        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }
    return (
        <Fragment>
            <ToastContainer />
            <SessionCheck />
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
                                        name="nearmisses"
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
                                        <MenuItem value='1'>Reported</MenuItem>
                                        <MenuItem value='2'>Not Reported</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-10 pt-2">
                                {toggle === '2' ? <Actiontaken setfunc={setnearmissdata} handover={nearmissdata} distrue={distrue} /> : <TextInput
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
                        <FooterClosebtn />
                    </div>
                </div>
            </form >
        </Fragment >

    )
}

export default Nearmissess

