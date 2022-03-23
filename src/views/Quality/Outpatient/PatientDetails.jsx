import { IconButton } from '@material-ui/core'
import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import TextInput from 'src/views/Component/TextInput'
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subMinutes } from 'date-fns';
import moment from 'moment'
import { userslno } from 'src/views/Constant/Constant'
import { differenceInMinutes } from 'date-fns'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'


const PatientDetails = ({ value, id }) => {
    const [enable, Setenable] = useState(false)
    const [userid, setuserid] = useState({
        us_code: ''
    })
    const [oppatentdetl, setoppatentdetl] = useState({
        vsd_date: '',
        dtrop_vosit_time: '',
        consult_start_time: '',
        consult_end_time: '',
    })
    const {
        vsd_date,
        dtrop_vosit_time,
        consult_start_time,
        consult_end_time,
    } = oppatentdetl

    const updateFormData = async (e) => {
        const value = e.target.value
        setoppatentdetl({ ...oppatentdetl, [e.target.name]: value })
    }
    const [doctormin, setdoctormin] = useState({
        dtrop_vosit_time: '',
    })

    const updatedocvist = async (val) => {

        const vistminuts = subMinutes(new Date(val), 15)
        const vistminutesd = moment(vistminuts).format("YYYY-MM-DD[T]HH:mm:ss")
        const frm = {
            dtrop_vosit_time: vistminutesd,
        }
        setdoctormin(frm)
    }
    var ia_timediffnurstn = differenceInMinutes(new Date(consult_start_time), new Date(dtrop_vosit_time))
    const postData = {
        vsd_date: value.vsd_date,
        doc_name: value.doc_name,
        dtrop_vosit_time: doctormin.dtrop_vosit_time,
        consult_start_time: consult_start_time,
        consult_end_time: consult_end_time,
        time_gap: ia_timediffnurstn,
        user_slno: userslno(),
        op_slno: id,
        dp_code: value.dp_code,
        pt_no: value.pt_no
    }

    console.log(postData)

    const postData1 = {
        vsd_date: value.vsd_date,
        doc_name: value.doc_name,
        dtrop_vosit_time: doctormin.dtrop_vosit_time,
        consult_start_time: consult_start_time,
        consult_end_time: consult_end_time,
        time_gap: ia_timediffnurstn,
        user_slno: userslno(),
        op_slno: id,
        dp_code: value.dp_code,
        pt_no: value.pt_no
    }


    console.log(postData1)
    const SubmitFormData = async (e) => {
        e.preventDefault()
        if (value === 0) {
            const result = await axioslogin.patch('/op_indicator', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                Setenable(true)
            } else if (success === 0) {
                Setenable(false)
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        } else {
            const results = await axioslogin.patch(`/op_indicator/detl/`, postData1)
            const { success, message } = results.data
            if (success === 1) {
                succesNofity(message)
                Setenable(true)
            } else if (success === 0) {
                warningNofity(message)
                Setenable(false)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        }
    }

    useEffect(() => {
        const getpatientdetails = async () => {
            const result = await axioslogin.get(`/op_indicator/detail/op/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                Setenable(true)
                const { consult_end_time,
                    consult_start_time,
                    doc_name,
                    dp_code,
                    dtrop_vosit_time,
                    opindicator_flag,
                    patient_opreg_time,
                    pt_no,
                    ptc_slno,
                    vsd_date } = data[0]
                const frmData = {
                    consult_start_time: moment(consult_start_time).format("YYYY-MM-DD[T]HH:mm:ss"),
                    consult_end_time: moment(consult_end_time).format("YYYY-MM-DD[T]HH:mm:ss"),
                    doc_name: doc_name,

                }
                const frm = {
                    dtrop_vosit_time: moment(dtrop_vosit_time).format("YYYY-MM-DD[T]HH:mm:ss"),
                }
                setdoctormin(frm)
                setoppatentdetl(frmData)
            }
            else if (success === 0) {
                Setenable(false)
                // setValue(0)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        getpatientdetails()
    }, [id])
    const Submiteditdetl = () => {
        Setenable(false)
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <li className="list-group-item py-0">
                <div className="d-flex justify-content-between" >
                    <div className="col-md-1">
                        <Typography variant="body2" gutterBottom className="my-0" style={{ paddingTop: "1rem" }} >
                            {value.pt_no}
                        </Typography>
                    </div>
                    <div className="col-md-1">
                        <Typography variant="body2" gutterBottom className="my-0" style={{ paddingTop: "1rem" }} >
                            {value.ptc_ptname}
                        </Typography>
                    </div>
                    <div className="col-md-2">
                        <Typography variant="body2" gutterBottom className="my-0"
                            style={{ paddingTop: "1rem" }}
                        >
                            {value.doc_name}
                        </Typography>
                    </div>
                    <div className="col-md-1" >
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="vsd_date"
                            disabled="disabled"
                            value={format(new Date(value.vsd_date), "yyyy-MM-dd")}
                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="datetime-local"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="doctormin"
                            // disabled="disabled"
                            value={dtrop_vosit_time}
                            changeTextValue={(e) => updateFormData(e)}
                            disabled={dtrop_vosit_time === 'Invalid date' ? false : enable}
                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="datetime-local"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_start_time"
                            value={consult_start_time}
                            changeTextValue={(e) => {
                                updateFormData(e)
                                updatedocvist(e.target.value)
                            }
                            }
                            disabled={consult_start_time === 'Invalid date' ? false : enable}
                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="datetime-local"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_end_time"
                            value={consult_end_time}
                            changeTextValue={(e) => updateFormData(e)}
                            disabled={consult_end_time === 'Invalid date' ? false : enable}

                        />
                    </div>
                    <div className="col-md-1 text-center">
                        <IconButton aria-label="add" style={{ paddingLeft: "1rem" }}
                            onClick={SubmitFormData}
                        >
                            <AddTaskRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="add" style={{ paddingLeft: "1rem" }}
                            onClick={Submiteditdetl}
                        >
                            <EditOutlinedIcon />
                        </IconButton>

                    </div>
                </div>
            </li>
        </Fragment >
    )
}

export default PatientDetails
