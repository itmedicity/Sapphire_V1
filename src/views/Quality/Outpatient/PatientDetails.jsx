import { IconButton } from '@material-ui/core'
import { Typography } from '@mui/material'
import moment from 'moment'
// import { useParams } from 'react-router'
import React, { Fragment, useState } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
import { format } from 'date-fns';

const PatientDetails = ({ value, key }) => {
    console.log(value)
    console.log(key)


    useEffect(() => {
        const getpatientdetails = async () => {

            // const result = await axioslogin.get(`/op_indicator/${'P001'}`)
            // console.log("rini")
            // console.log(result)
            // const { success, data } = result.data
            // if (success === 1) {
            //     const { op_slno, ptc_ptname, doc_name, vsd_date, dtrop_vosit_time,
            //         consult_start_time, consult_end_time, remark } = data[0]
            //     const frmData = {
            //         op_slno: op_slno,
            //         ptc_ptname: ptc_ptname,
            //         doc_name: doc_name,
            //         vsd_date: vsd_date,
            //         dtrop_vosit_time: dtrop_vosit_time,
            //         consult_start_time: consult_start_time,
            //         consult_end_time: consult_end_time,
            //         remark: remark
            //     }
            //     setFormData(frmData)
            // }
            // else {
            //     warningNofity("Error Occured")
            // }
        }
        getpatientdetails()
    }, [])


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
                            value={format(new Date(value.vsd_date), "yyyy-MM-dd")}
                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="datetime-local"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="dtrop_vosit_time"
                            disabled="disabled"
                        // value={format(new Date(value.dtrop_vosit_time), "yyyy-MM-dd")}

                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="datetime-local"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_start_time"
                        // value={consult_start_time}
                        // changeTextValue={(e) => updateOpIndicator(e)}
                        />
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="datetime-local"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="Date"
                            name="consult_end_time"
                        // value={consult_end_time}
                        // changeTextValue={(e) => updateOpIndicator(e)}
                        />
                    </div>
                    <div className="col-md-1 text-center">
                        <IconButton aria-label="add" style={{ padding: "0rem" }}
                        // onClick={SubmitFormData}
                        >
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
