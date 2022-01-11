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

const Sentinalevent = () => {
    const { id } = useParams()
    // const classes = useStyles()
    const [toggle, setToggle] = useState(0)
    const [distrue, setdistrue] = useState(false)
    const [value, setValue] = useState(0)

    const [userid, setuserid] = useState({
        us_code: ''
    })

    const [open, setOpen] = useState(false)


    const [sentinentdata, setsentinentdata] = useState({
        sentinent: '',
        errordesc: '',
        personresponsible: '',
        actiontaken: '',
        remarks: ''
    })
    //default state
    // const defaultstate = {
    //     sentinent: '',
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
    } = sentinentdata

    const updateFormData = (e) => {
        const value = e.target.value
        setsentinentdata({ ...sentinentdata, [e.target.name]: value })
    }
    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        ser_ysno: toggle,
        ser_errordesc: errordesc,
        ser_personresponsible: personresponsible,
        ser_actntkn: actiontaken,
        ser_remark: remarks,
        user_code_save: userid
    }
    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        ser_ysno: toggle,
        ser_errordesc: errordesc,
        ser_personresponsible: personresponsible,
        ser_actntkn: actiontaken,
        ser_remark: remarks,
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
                const result = await axioslogin.post('/sentinelevent', postData)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setdistrue(true)
                    setOpen(false)
                    // setsentinentdata(defaultstate)
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                const result = await axioslogin.patch('/sentinelevent', postDataEdit)
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
        } else {
            errorNofity('Error Occured !!! Please Contact Edp ')
        }
    }
    useEffect(() => {
        const sentient = async () => {
            const result = await axioslogin.get(`sentinelevent/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                // setdistrue(true)
                const { inpt_slno, ser_ysno, ser_remark, ser_errordesc, ser_personresponsible, ser_actntkn } = data[0]

                const frmData = {
                    //  nearmisses: ser_ysno,
                    errordesc: ser_errordesc,
                    personresponsible: ser_personresponsible,
                    actiontaken: ser_actntkn,
                    remarks: ser_remark
                }
                setsentinentdata(frmData)
                setValue(inpt_slno)
                setToggle(ser_ysno)
                setdistrue(true)
            }
            else if (success === 0) {
                setdistrue(false)
                setValue(0)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        sentient()
    }, [id])

    const editsentinalevent = () => {
        setdistrue(false)
    }

    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true)
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
                                        name="sentinent"
                                        value={toggle}
                                        size="small"
                                        id="demo-simple-select"
                                        onChange={(e) => {
                                            setToggle(e.target.value)
                                        }}
                                        fullWidth
                                        disabled={distrue}
                                        variant="outlined"
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                    >
                                        <MenuItem value='0'>selected option</MenuItem>
                                        <MenuItem value='1'>Reported</MenuItem>
                                        <MenuItem value='2'>Not Reported</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-10 pt-2">
                                {toggle === '2' ? <Actiontaken setfunc={setsentinentdata} handover={sentinentdata} distrue={distrue} /> : <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
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
                <div className="card-footer"
                // style={{
                //   backgroundColor: '#b6b8c3',
                // }}
                >
                    <div className="col-md-12">
                        <FooterClosebtn
                            edit={editsentinalevent} />
                    </div>
                </div>
            </form>
        </Fragment>

    )
}

export default Sentinalevent
