import { Card, Typography } from '@mui/material'
import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
import moment from 'moment'
const IntialAssessmentCasuality = () => {

    const { id } = useParams()
    const [value, setValue] = useState(0)
    //use state for enable fields on clicking edit button
    const [enable, Setenable] = useState(false)

    const [IntialCasualityData, setIntialCasualityData] = useState({
        arrivedtime_casuality: '',
        casuality_intialstart: '',
        casuality_initialend: '',
        casuallity_remark: '',
    })
    // //Default State
    // const defaultstate = {
    //     arrivedtime_casuality: '',
    //     casuality_intialstart: '',
    //     casuality_initialend: '',
    //     casuallity_remark: '',
    // }

    //destructing object
    const { arrivedtime_casuality, casuality_intialstart, casuality_initialend, casuallity_remark } = IntialCasualityData

    //getting data from the form

    const updateFormData = async (e) => {
        const value = e.target.value
        setIntialCasualityData({ ...IntialCasualityData, [e.target.name]: value })
    }

    const postData = {
        inpt_slno: id,
        patnt_receive_cas: arrivedtime_casuality,
        intial_assessment_start: casuality_intialstart,
        initial_assessment_end: casuality_initialend,
        remarks: casuallity_remark,
        user_slno: userslno(),
    }
    const postDataEdit = {
        patnt_receive_cas: arrivedtime_casuality,
        intial_assessment_start: casuality_intialstart,
        initial_assessment_end: casuality_initialend,
        remarks: casuallity_remark,
        user_slno: userslno(),
        inpt_slno: value
    }


    //saving Form Data
    const submitFormData = async (e) => {
        e.preventDefault()
        if (value === 0) {
            const result = await axioslogin.post('/initialassessmentcasuality', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                Setenable(true)
                // setIntialCasualityData(defaultstate)
            } else if (success === 0) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        } else {
            const result = await axioslogin.patch('/initialassessmentcasuality', postDataEdit)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                Setenable(true)
            } else if (success === 1) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        }

    }

    useEffect(() => {
        const getcasualinitailassessnurse = async () => {
            const result = await axioslogin.get(`initialassessmentcasuality/${id}`)
            const { success, data } = result.data

            if (success === 1) {
                Setenable(true)
                const { inpt_slno, patnt_receive_cas, intial_assessment_start, initial_assessment_end, remarks } = data[0]
                const frmData = {
                    arrivedtime_casuality: moment(patnt_receive_cas).format("YYYY-MM-DD[T]HH:mm:ss"),
                    casuality_intialstart: moment(intial_assessment_start).format("YYYY-MM-DD[T]HH:mm:ss"),
                    casuality_initialend: moment(initial_assessment_end).format("YYYY-MM-DD[T]HH:mm:ss"),
                    casuallity_remark: remarks
                }
                setIntialCasualityData(frmData)
                setValue(inpt_slno)
            }
            else if (success === 2) {
                Setenable(false)
                setValue(0)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        getcasualinitailassessnurse()
    }, [id])

    const editcasuaslinitialassessment = () => {
        Setenable(false)
    }

    return (
        <Fragment>
            <form onSubmit={submitFormData}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3  pb-1">
                                <Typography fontSize={16} noWrap={true} >Arrived Time</Typography>

                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Arrived Time"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={arrivedtime_casuality}
                                    name="arrivedtime_casuality"
                                    disabled={enable}
                                />
                            </div>
                            <div className="col-md-3  pb-1">
                                <Typography fontSize={16} noWrap={true} > Initial Assessment start</Typography>

                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment start"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={casuality_intialstart}
                                    name="casuality_intialstart"
                                    disabled={enable}
                                />
                            </div>
                            <div className="col-md-3  pb-1">
                                <Typography fontSize={16} noWrap={true} > Initial Assessment End</Typography>

                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment End"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={casuality_initialend}
                                    name="casuality_initialend"
                                    disabled={enable}
                                />
                            </div>
                            <div className="col-md-2  pb-1">
                                <Typography fontSize={16} noWrap={true} > Remark</Typography>

                                <TextInput classname="form-control form-control-sm" Placeholder="Remark"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={casuallity_remark}
                                    name="casuallity_remark"
                                    disabled={enable}
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
                    <div className="col-md-12 p-0">
                        <FooterClosebtn
                            edit={editcasuaslinitialassessment}
                        //redirect={RedirectToProfilePage}
                        // value={value}
                        />
                    </div>
                </div>
            </form>

        </Fragment>
    )
}

export default IntialAssessmentCasuality
