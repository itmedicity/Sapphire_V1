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
import { format } from 'date-fns';

const PatientDetails = ({ value }) => {
    console.log(value)
    const { op_slno, dp_code, pt_no, ptc_ptname, doc_name, vsd_date, dtrop_vosit_time } = value
    const [formData, setFormData] = useState({
        // vsd_date: "",
        //dtrop_vosit_time: "",
        consult_start_time: "",
        consult_end_time: "",
    })
    const { consult_start_time, consult_end_time } = formData



    const updateOpIndicator = async (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        op_slno: op_slno,
        user_slno: userslno(),
        dp_code: dp_code,
        vsd_date: moment(vsd_date).format('YYYY-MM-DD'),
        dtrop_vosit_time: moment(dtrop_vosit_time).format('YYYY-MM-DD'),
        consult_start_time: moment(consult_start_time).format('YYYY-MM-DD'),
        consult_end_time: moment(consult_end_time).format('YYYY-MM-DD'),

    }

    //saving form data
    const SubmitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/op_indicator/post', postData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            // setFormData(defaultState)
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
                            {pt_no}
                        </Typography>
                    </div>
                    <div className="col-md-1">
                        <Typography variant="body2" gutterBottom className="my-0" >
                            {ptc_ptname}
                        </Typography>
                    </div>
                    <div className="col-md-2">
                        <Typography variant="body2" gutterBottom className="my-0"
                        >
                            {doc_name}
                        </Typography>
                    </div>
                    <div className="col-md-1">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="vsd_date"
                            disabled="disabled"
                            value={format(new Date(vsd_date), "yyyy-MM-dd")}
                        />
                    </div>

                    <div className="col-md-2 text-start">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="dtrop_vosit_time"
                            disabled="disabled"
                            value={format(new Date(dtrop_vosit_time), "yyyy-MM-dd")}

                        />

                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_start_time"
                            value={consult_start_time}
                            changeTextValue={(e) => updateOpIndicator(e)}
                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="date"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_end_time"
                            value={consult_end_time}
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
