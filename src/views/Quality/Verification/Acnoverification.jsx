
import React, { Fragment, useEffect, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import OutletSelect from 'src/views/CommonCode/OutletSelect'
import { ImSearch } from "react-icons/im";
import { Button, IconButton } from '@mui/material';

import { axioslogin } from 'src/views/Axios/Axios'
import AcnopatientTable from './AcnopatientTable';
import moment from 'moment'
import { ToastContainer } from 'react-toastify'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import Pendingindictor from './Pendingindictor';


const Acnoverification = () => {
    const [acnoData, setacnoData] = useState({
        ou_code: '',
        initialassNurse: '',
        initialassDoc: '',
        discharge: '',
        careplan_ys: ''
    })
    const { ou_code, initialassNurse, initialassDoc, discharge, careplan_ys } = acnoData

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

    const searchall = async () => {
        setSearch(true)

        const result = await axioslogin.get('/manadtory/ou_code', postData1)
        const { success, message } = result.data
        if (success === 2) {
            setToaster(true)
        } else if (success === 0) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    };


    const [toaster, setToaster] = useState(false)


    const postData2 = {
        ou_code: ou_code,
        initialassessment_nurse: initialassNurse,
        initialassessment_doctor: initialassDoc,
        discharge: discharge,
        careplan_ys: careplan_ys,
        // equipment_utilization: equipment_utilization,
        // bc_blood_wastage: bc_blood_wastage,
        // bc_transreaction_ys: bc_transreaction_ys,
        // bc_bloodtransrectn_no: bc_bloodtransrectn_no,
        // careplan_ys: careplan_ys,
        // careplan_no: careplan_no,
        // acno_flag: acno_flag,
        // date: date
    }
    const postData3 = {
        ou_code: ou_code,
        acno_flag: 'Y'
    }

    const postData1 = {
        ou_code: ou_code,
    }
    // useEffect(() => {
    //     const getdata = async () => {
    //         const result = await axioslogin.get('/manadtory/ou_code', postData1)
    //         const { success, message } = result.data
    //         console.log(result)
    //         if (success === 2) {
    //             setToaster(true)
    //         } else if (success === 0) {
    //             warningNofity(message)
    //         } else {
    //             errorNofity('Error Occured!!!Please Contact EDP')
    //         }

    //     }
    //     getdata()
    // }, [])

    // insert value
    const submitdataacno = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/acnoverification', postData2)
        const { success, message } = result.data
        if (success === 1) {
            const result = await axioslogin.patch('/acnoverification', postData3)
            const { success, message } = result.data
            if (success === 2) {
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
                    <h5>ACNO Verification</h5>
                </div>
                <div className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-2  pb-1">
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
                                {/* <Button className="col-md-3 col-sm-12" color="secondary" align="center"
                                    onClick={submitdataacno}
                                >
                                    Approved </Button> */}
                            </div>
                            <div className="col-md-1">
                                <Button className="col-md-3 col-sm-12" color="secondary" align="center"
                                    onClick={submitdataacno}
                                >
                                    Approved </Button>
                            </div>
                            <div className="col-md-5">
                                {toaster === true ? <Pendingindictor /> : null}
                            </div>
                            <div>
                                {search === true ? <AcnopatientTable frdate={moment(monthwise).format("MM")} setacnoData={setacnoData} acnoData={acnoData} /> : null}

                            </div>




                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )
}

export default Acnoverification
