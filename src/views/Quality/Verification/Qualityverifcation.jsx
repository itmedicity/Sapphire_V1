import React, { Fragment, useEffect, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import OutletSelect from 'src/views/CommonCode/OutletSelect'
import { ImSearch } from "react-icons/im";
import { Button, IconButton } from '@mui/material';
import moment from 'moment'
import Qualityverifitable from './Qualityverifitable';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Qualityverifcation = () => {


    const [acnoData, setacnoData] = useState({
        ou_code: '',
        initialassNurse: '',
        initialassDoc: ''
    })
    const { ou_code, initialassNurse, initialassDoc } = acnoData

    const [monthval, Setmonthval] = useState({
        monthwise: ''
    })
    const {
        monthwise
    } = monthval

    // var frdate = (moment(monthwise).format("MM"));
    //getting data from the form 
    const updateFormData = async (e) => {
        const value = e.target.value
        Setmonthval({ ...monthval, [e.target.name]: value })
    }

    const [search, setSearch] = useState(false)


    const searchall = () => {
        setSearch(true)
    };

    const postData2 = {
        ou_code: ou_code,
        intiailassessment_nurse: initialassNurse,
        initialassessment_doctor: initialassDoc,
    }

    const postData3 = {
        ou_code: ou_code,
        quality_approvalflag: 'Y'
    }


    // insert value
    const submitdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/qualityverification', postData2)
        const { success, message } = result.data
        if (success === 1) {
            const result = await axioslogin.patch('/qualityverification', postData3)
            const { success, message } = result.data
            console.log(success)
            if (success === 2) {
                // <stack>
                //     <Alert severity="success">This is a success alert — check it out!</Alert>
                // </stack>
                succesNofity(message)
            } else if (success === 0) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }

        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }
    return (
        <Fragment>
            <ToastContainer />
            <div className="card">

                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Quality Verification</h5>
                </div>
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3      pb-1">
                                {/* <Typography fontSize={16} noWrap={true} >Select Month</Typography> */}
                                <TextInput
                                    id="test"
                                    type="month"
                                    classname="form-control form-control-sm"
                                    Placeholder="Arrived Time"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={monthwise}
                                    name="monthwise"
                                // disabled={enable}
                                />
                            </div>
                            <div className="col-md-2 pb-1">
                                <OutletSelect
                                    style={{
                                        minHeight: 10,
                                        maxHeight: 27,
                                        paddingTop: 0,
                                        paddingBottom: 4,
                                    }}
                                />
                            </div>
                            <div className="col-md-1  col-sm-12">

                                <IconButton onClick={searchall}>
                                    < ImSearch size={22} />
                                </IconButton>
                            </div>
                            <div className="col-md-1">
                                <Button className="col-md-3 col-sm-12" color="secondary" align="center"
                                    onClick={submitdata}
                                >
                                    Approved</Button>
                            </div>

                            <div>
                                {search === true ? <Qualityverifitable frdate={moment(monthwise).format("MM")} setacnoData={setacnoData} acnoData={acnoData} /> : null}

                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )
}

export default Qualityverifcation
