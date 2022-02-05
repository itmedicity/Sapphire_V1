import React, { Fragment, memo, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModelapproverejectTable from './ModelapproverejectTable';
import { axioslogin } from '../Axios/Axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
// import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
const Modelapprovereject = ({ open, handleClose, getid }) => {


    const [indictflag, setindictflag] = useState({
        indict_flag: ''
    })
    const {
        indict_flag
    } = indictflag

    const postData2 = {
        inpt_slno: getid,
        indict_flag: 'Y'
    }
    var datee = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss")
    const postData3 = {
        ou_code: 'M001',
        datee: '2022-01-29 11:53:32'
    }
    console.log(postData3)
    // const postData4 = {
    //     ou_code: '4001',
    //     datee: datee
    // }

    const submitdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/verification', postData2)
        const { success, message } = result.data
        if (success === 2) {
            const result2 = await axioslogin.post('/verification/oudetl', postData3)
            const { success, message } = result2.data
            if (success === 3) {
                const result3 = await axioslogin.post('/verification/getdetails', postData3)
                console.log(result3)
                const { success, data, message } = result3.data
                console.log(data)
                if (success === 3) {
                    const { initalass_nurse_diff, initalass_doctor_diff,
                        careplan_yn, handover_yn, incedence_yn,
                        bloodcomponent_wastage,
                        bloodcomponent_rctnoccured, ptntidntfnerror_yn,
                        nearmiss_yn, dischargetimediff, ou_code, datee } = data[0]
                    const frmdataa = {
                        intialassessment_nurse: initalass_nurse_diff,
                        intialassessment_doctor: initalass_doctor_diff,
                        dicharge: dischargetimediff,
                        bc_blood_wastage: bloodcomponent_wastage,
                        bc_bloodtransreactn_ys: bloodcomponent_rctnoccured,
                        carepln_ys: careplan_yn,
                        hndcomm_ys: handover_yn,
                        incidence_ys: incedence_yn,
                        datee: moment(datee).format("YYYY-MM-DD[T]HH:mm:ss"),
                        ou_code: ou_code
                    }
                    console.log(frmdataa)
                    console.log(frmdataa)
                    const result4 = await axioslogin.post('/verification/insert', frmdataa)
                    const { success, message } = result4.data
                    if (success === 1) {
                        succesNofity(message)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                }
                else if (success === 2) {

                    const { initalass_nurse_diff, initalass_doctor_diff,
                        careplan_yn, handover_yn, incedence_yn,
                        bloodcomponent_wastage,
                        bloodcomponent_rctnoccured, ptntidntfnerror_yn,
                        nearmiss_yn, dischargetimediff, ou_code, datee } = data[0]
                    const frmdataa = {
                        intialassessment_nurse: initalass_nurse_diff,
                        intialassessment_doctor: initalass_doctor_diff,
                        dicharge: dischargetimediff,
                        bc_blood_wastage: bloodcomponent_wastage,
                        bc_bloodtransreactn_ys: bloodcomponent_rctnoccured,
                        carepln_ys: careplan_yn,
                        hndcomm_ys: handover_yn,
                        incidence_ys: incedence_yn,
                        datee: moment(datee).format("YYYY-MM-DD[T]HH:mm:ss"),
                        ou_code: ou_code
                    }
                    const result4 = await axioslogin.patch('/verification/edit', frmdataa)
                    const { success, message } = result4.data
                    if (success === 2) {
                        succesNofity(message)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                }
            }
        }
        else if (success === 0) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured !!! Please Contact Edp ')
        }
    }
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                // TransitionComponent={Transition}
                fullWidth={true}
                maxWidth={'md'}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle style={{ alignContent: 'center', fontSize: '22' }}>{"Indicators Summary"}</DialogTitle>
                <DialogContent sx={{
                    minWidth: 500,
                    maxWidth: 900,
                    width: 900,
                }}>
                    <div>
                        <ModelapproverejectTable getid={getid} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={submitdata} >Validated</Button>
                    <Button onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(Modelapprovereject)






