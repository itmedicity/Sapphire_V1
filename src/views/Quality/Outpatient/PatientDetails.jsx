import { IconButton } from '@material-ui/core'
import { Typography } from '@mui/material'
import moment from 'moment'
import { useParams } from 'react-router'
import React, { Fragment, useState } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'

const PatientDetails = ({ value }) => {
    const { id } = useParams()

    const [formData, setFormData] = useState({
        vsd_date: "",
        dtrop_vosit_time: "",
        consult_start_time: "",
        consult_end_time: "",

    })
    const { vsd_date, dtrop_vosit_time, consult_start_time, consult_end_time } = formData


    const defaultState = {
        vsd_date: "",
        dtrop_vosit_time: "",
        consult_start_time: "",
        consult_end_time: ""
    }
    const updateOpIndicator = async (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        op_slno: id,
        user_slno: userslno(),
        vsd_date: moment(vsd_date).format('yyyy-MM-dd'),
        dtrop_vosit_time: moment(dtrop_vosit_time).format('yyyy-MM-dd'),
        consult_start_time: moment(consult_start_time).format('YYYY-MM-DD'),
        consult_end_time: moment(consult_end_time).format('YYYY-MM-DD'),

    }

    //saving form data
    const SubmitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/op_indicator', postData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setFormData(defaultState)
        } else if (success === 0) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }


    return (
        <Fragment>
            <li className="list-group-item py-0">
                <div className="d-flex justify-content-between" >
                    <div className="col-md-1">
                        <Typography variant="body2" gutterBottom className="my-0" >
                            {value.pt_no}
                        </Typography>
                    </div>
                    <div className="col-md-1">
                        <Typography variant="body2" gutterBottom className="my-0" >
                            {value.ptc_ptname}
                        </Typography>
                    </div>
                    <div className="col-md-2">
                        <Typography variant="body2" gutterBottom className="my-0"
                        >
                            {value.doc_name}

                        </Typography>
                    </div>
                    <div className="col-md-1">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="vsd_date"
                            disabled="disabled"
                            value={moment(value.vsd_date).format('YYYY-MM-DD')}
                            changeTextValue={(e) => updateOpIndicator(e)}
                        />
                    </div>

                    <div className="col-md-2 text-start">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="dtrop_vosit_time"
                            disabled="disabled"
                            value={moment(value.dtrop_vosit_time).format('YYYY-MM-DD')}
                            //value={moment(dtrop_vosit_time).format("yyyy-MM-dd")}
                            changeTextValue={(e) => updateOpIndicator(e)}
                        />

                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_start_time"
                            value={moment(consult_start_time).format('YYYY-MM-DD')}
                            changeTextValue={(e) => updateOpIndicator(e)}
                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_end_time"
                            value={moment(consult_end_time).format('YYYY-MM-DD')}
                            changeTextValue={(e) => updateOpIndicator(e)}
                        />
                    </div>

                    <div className="col-md-1 text-center">
                        <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={SubmitFormData}  >
                            <AddTaskRoundedIcon
                            // color={color === false ? "success" : "error"}
                            />
                        </IconButton>
                    </div>
                </div>

            </li>
        </Fragment >
    )
}

export default PatientDetails
