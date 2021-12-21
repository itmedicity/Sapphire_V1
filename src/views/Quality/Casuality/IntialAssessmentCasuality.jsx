import { Card } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'

const IntialAssessmentCasuality = () => {

    // const id = useParams()


    const [IntialCasualityData, setIntialCasualityData] = useState({
        arrivedtime_casuality: '',
        casuality_intialstart: '',
        casuality_initialend: '',
        casuallity_remark: '',
    })
    //Default State
    const defaultstate = {
        arrivedtime_casuality: '',
        casuality_intialstart: '',
        casuality_initialend: '',
        casuallity_remark: '',
    }

    //destructing object
    const { arrivedtime_casuality, casuality_intialstart, casuality_initialend, casuallity_remark } = IntialCasualityData

    //getting data from the form

    const updateFormData = async (e) => {
        const value = e.target.value
        setIntialCasualityData({ ...IntialCasualityData, [e.target.name]: value })
    }

    const postData = {
        // inpt_slno: id,
        patnt_receive_cas: arrivedtime_casuality,
        intial_assessment_start: casuality_intialstart,
        initial_assessment_end: casuality_initialend,
        remarks: casuallity_remark,
        user_slno: userslno(),
    }


    //saving Form Data
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/initialassessmentcasuality', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setIntialCasualityData(defaultstate)
        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }
    return (
        <Fragment>
            <form onSubmit={submitFormData}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3  pb-1">
                                <label htmlFor="test" className="form-label">
                                    Arrived Time
                                </label>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Arrived Time"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={arrivedtime_casuality}
                                    name="arrivedtime_casuality"
                                />
                            </div>
                            <div className="col-md-3  pb-1">
                                <label htmlFor="test" className="form-label">
                                    Initial Assessment start
                                </label>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment start"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={casuality_intialstart}
                                    name="casuality_intialstart"
                                />
                            </div>
                            <div className="col-md-3  pb-1">
                                <label htmlFor="test" className="form-label">
                                    Initial Assessment End
                                </label>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment End"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={casuality_initialend}
                                    name="casuality_initialend"
                                />
                            </div>
                            <div className="col-md-2  pb-1">
                                <label htmlFor="test" className="form-label">
                                    Remark
                                </label>
                                <TextInput classname="form-control form-control-sm" Placeholder="Remark"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={casuallity_remark}
                                    name="casuallity_remark"
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

        </Fragment>
    )
}

export default IntialAssessmentCasuality
