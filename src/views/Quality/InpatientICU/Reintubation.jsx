import React, { Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import { Card, Typography } from '@mui/material'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import TextInput from 'src/views/Component/TextInput'
import moment from 'moment'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'


const Reintubation = () => {
    // const [value, setValue] = useState(new Date());
    const [enable, setenable] = useState(false)
    const { id } = useParams()
    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };
    const [redatevalue, setreDatevalue] = useState(0)

    const [reintubate, setReintubate] = useState({
        intubatedrate: '',
        extubatedrate: ''
    })

    //defaultb state
    const defaultstate = {
        intubatedrate: '',
        extubatedrate: '',
    }

    const {
        intubatedrate,
        extubatedrate
    } = reintubate

    const updateFormData = async (e) => {
        const value = e.target.value
        setReintubate({ ...reintubate, [e.target.name]: value })
    }

    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        intubated_date: intubatedrate,
        extubated_date: extubatedrate,
    }

    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/reIntubationrate', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setenable(true)
        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }



    const editreturn = () => {
        // setenable(false)
        // setdistrue(false)
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form onSubmit={submitFormData}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">

                            <div className="col-md-2"></div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Intubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Arrived Time"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={intubatedrate}
                                    name="intubatedrate"
                                    disabled={enable}
                                />
                            </div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Extubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment start"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={extubatedrate}
                                    name="extubatedrate"
                                    disabled={enable}
                                />
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-2"></div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Reintubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    Placeholder="Initial Assessment End"
                                //     changeTextValue={(e) => updateFormData(e)}
                                //     value={reintubatedrate}
                                //     name="reintubatedrate"
                                //     disabled={enable}
                                />
                            </div>
                            <div className="col-md-4  pb-1">
                                <Typography fontSize={16} noWrap={true} >Reextubated Date</Typography>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                // changeTextValue={(e) => updateFormData(e)}
                                // value={reextubated_date}
                                // name="reextubated_date"
                                // disabled={enable}
                                />
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                        <div className="row">

                            <div className="col-md-2"></div>
                            <div className="col-md-8  pb-1">
                                <Typography fontSize={16} noWrap={true} >Remarks</Typography>
                                <TextInput classname="form-control form-control-sm" Placeholder="Remark"
                                // changeTextValue={(e) => updateFormData(e)}
                                // value={remarkns}
                                // name="remarkns"
                                // disabled={enable}
                                />
                                <div className="col-md-2"></div>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="card-footer">
                    <div className="col-md-12">
                        <FooterClosebtn
                            edit={editreturn}
                        />
                    </div>
                </div>

            </form>
        </Fragment >
    )
}
export default Reintubation



