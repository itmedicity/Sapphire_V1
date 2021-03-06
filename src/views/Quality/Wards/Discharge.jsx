import React, { Fragment, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useParams } from 'react-router'
import { Card, Typography } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'
import Modelcommon from 'src/views/CommonCode/Modelcommon'
import { differenceInMinutes } from 'date-fns'
const Discharge = () => {
    const { id } = useParams()
    const [distrue, setdistrue] = useState(false)
    const [value, setValue] = useState(0)

    // for user validation
    const [userid, setuserid] = useState({
        us_code: ''
    })
    //   setting intial state
    const [dischargeData, setdischargeData] = useState({
        dis_advice_time: '',
        dis_sumrec_time: '',
        summ_prep_time: '',
        sumhand_patent: '',
        date_dis: '',
        patent_from_unit: ''
    })
    //   destructing object
    const { dis_advice_time,
        dis_sumrec_time,
        summ_prep_time,
        sumhand_patent,
        date_dis,
        patent_from_unit
    } = dischargeData

    // getting data from the form
    const updateFormData = async (e) => {
        const value = e.target.value
        setdischargeData({ ...dischargeData, [e.target.name]: value })
    }
    var differenceintime = differenceInMinutes(new Date(patent_from_unit), new Date(dis_advice_time))
    const postData2 = {
        inpt_slno: id,
        dischargetimediff: differenceintime
    }
    const postData = {
        inpt_slno: id,
        dis_advicetime: dis_advice_time,
        summary_rectime: dis_sumrec_time,
        summary_pretime: summ_prep_time,
        summary_handoverptnt: sumhand_patent,
        dis_date: date_dis,
        patnt_leav: patent_from_unit,
        distimediffernce: differenceintime,
        user_slno: userslno(),
        user_code_save: userid.us_code,
    }

    console.log(postData)
    const postDataEdit = {
        inpt_slno: value,
        dis_advicetime: dis_advice_time,
        summary_rectime: dis_sumrec_time,
        summary_pretime: summ_prep_time,
        summary_handoverptnt: sumhand_patent,
        dis_date: date_dis,
        patnt_leav: patent_from_unit,
        distimediffernce: differenceintime,
        user_slno: userslno(),
        user_code_save: userid.us_code,
    }
    //saving form data
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
            if (value === 0) {
                const result = await axioslogin.post('/Discharge', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result2 = await axioslogin.patch('/Discharge/edit', postData2)
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
                }
                else if (success === 0) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                console.log('minu')
                const result = await axioslogin.patch('/Discharge', postDataEdit)
                const { success, message } = result.data
                if (success === 2) {
                    const result2 = await axioslogin.patch('/Discharge/edit', postData2)
                    const { success, message } = result2.data
                    if (success === 2) {
                        succesNofity(message)
                        setdistrue(true)
                        setOpen(false);
                    }
                    else if (success === 1) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error')
                    }
                } else if (success === 1) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
        } else if (success === 0) {
            warningNofity(message)
        }
        else {
            errorNofity('Error Occured !!! Please contact Edp')
        }
    }
    useEffect(() => {
        const discharge = async () => {
            const result = await axioslogin.get(`Discharge/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { inpt_slno, dis_date, dis_advicetime,
                    summary_pretime, summary_rectime,
                    summary_handoverptnt, patnt_leav
                } = data[0]
                const frmData = {
                    date_dis: moment(dis_date).format("YYYY-MM-DD[T]HH:mm:ss"),
                    dis_advice_time: moment(dis_advicetime).format("YYYY-MM-DD[T]HH:mm:ss"),
                    summ_prep_time: moment(summary_pretime).format("YYYY-MM-DD[T]HH:mm:ss"),
                    sumhand_patent: moment(summary_handoverptnt).format("YYYY-MM-DD[T]HH:mm:ss"),
                    dis_sumrec_time: moment(summary_rectime).format("YYYY-MM-DD[T]HH:mm:ss"),
                    patent_from_unit: moment(patnt_leav).format("YYYY-MM-DD[T]HH:mm:ss")
                }
                setdischargeData(frmData)
                setValue(inpt_slno)
                setdistrue(true)
            }
            else if (success === 2) {
                setdistrue(false)
                setValue(0)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        discharge()
    }, [id])
    const editdischarge = () => {
        setdistrue(false)
    }
    //for model close and open
    const [open, setOpen] = useState(false)
    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };
    const handClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <Modelcommon open={open} handClose={handClose} submit={submitFormData} setuserid={setuserid} />
            <form onSubmit={handleClickOpen}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3">
                                <Typography fontSize={16} noWrap={true} >Discharge Advice Time</Typography>
                            </div>
                            <div className="col-md-3 pb-1">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    ampm={false}
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={dis_advice_time}
                                    name="dis_advice_time"
                                    disabled={distrue}
                                />
                            </div>
                            <div className="col-md-3">
                                <Typography fontSize={16} noWrap={true} >Summary Prepare Time</Typography>
                            </div>
                            <div className="col-md-3 pb-1">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={summ_prep_time}
                                    name="summ_prep_time"
                                    disabled={distrue}
                                    min={dis_advice_time}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Typography fontSize={16} noWrap={true} >Discharge Summary Received Time</Typography>
                            </div>
                            <div className="col-md-3 pb-1">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={dis_sumrec_time}
                                    name="dis_sumrec_time"
                                    disabled={distrue}
                                    min={dis_advice_time}
                                />
                            </div>
                            <div className="col-md-3">
                                <Typography fontSize={16} noWrap={true} >Summary HandOver to Patient</Typography>
                            </div>
                            <div className="col-md-3 pb-1">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={sumhand_patent}
                                    name="sumhand_patent"
                                    disabled={distrue}
                                    min={dis_advice_time}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <Typography fontSize={16} noWrap={true} >Date of Discharge</Typography>
                            </div>
                            <div className="col-md-3 pb-1">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={date_dis}
                                    name="date_dis"
                                    disabled={distrue}
                                    min={dis_advice_time}
                                />
                            </div>
                            <div className="col-md-3">
                                <Typography fontSize={16} noWrap={true} >Patient leaving from the unit</Typography>
                            </div>
                            <div className="col-md-3 pb-1">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={patent_from_unit}
                                    name="patent_from_unit"
                                    disabled={distrue}
                                    min={sumhand_patent}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="card-footer">
                    <div className="col-md-12">
                        <FooterClosebtn edit={editdischarge} />
                    </div>
                </div>
            </form>
        </Fragment >
    )
}
export default Discharge
