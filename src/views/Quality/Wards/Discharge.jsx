import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { useHistory, useParams } from 'react-router'
import { Card } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
const Discharge = () => {
    const { id } = useParams()
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home/InpatientEdit/${id}`)
    }
    //   setting intial state
    const [dischargeData, setdischargeData] = useState({
        dis_advice_time: '',
        dis_sumrec_time: '',
        summ_prep_time: '',
        sumhand_patent: '',
        date_dis: '',
        patent_from_unit: ''
    })

    //   default state
    const defaultstate = {
        dis_advice_time: '',
        dis_sumrec_time: '',
        summ_prep_time: '',
        sumhand_patent: '',
        date_dis: '',
        patent_from_unit: ''
    }
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
    const postData = {
        inpt_slno: id,
        dis_advicetime: dis_advice_time,
        summary_rectime: dis_sumrec_time,
        summary_pretime: summ_prep_time,
        summary_handoverptnt: sumhand_patent,
        dis_date: date_dis,
        patnt_leav: patent_from_unit,
        user_slno: userslno(),
    }

    //saving form data
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/Discharge', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setdischargeData(defaultstate)
        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form onSubmit={submitFormData}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3 ">
                                <label htmlFor="test" className="form-label">Discharge Advice Time</label>
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={dis_advice_time}
                                    name="dis_advice_time"
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="test" className="form-label">Discharge Summary Received Time</label>
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={dis_sumrec_time}
                                    name="dis_sumrec_time"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="test" className="form-label">Summary Prepare Time</label>
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={summ_prep_time}
                                    name="summ_prep_time"
                                />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="test" className="form-label">Summary HandOver to Patient</label>
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={sumhand_patent}
                                    name="sumhand_patent"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label htmlFor="test" className="form-label">Date of Discharge</label>
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={date_dis}
                                    name="date_dis"
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="test" className="form-label">Patient leaving from the unit</label>
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={patent_from_unit}
                                    name="patent_from_unit"
                                />
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
            </form>
        </Fragment >
    )
}
export default Discharge
