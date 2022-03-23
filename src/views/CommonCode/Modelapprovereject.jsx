import React, { Fragment, memo, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer } from 'react-toastify'
import ModelapproverejectTable from './ModelapproverejectTable';
import { axioslogin } from '../Axios/Axios';
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
const Modelapprovereject = ({ open, handleClose, handleopenmodel, getid, setOpen }) => {


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
    // var datee = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss")
    const postData3 = {
        ou_code: 'M001',
        datee: '2022-01-28 11:53:32'
    }

    // update the flag with indicator caluculation table
    //select the data from dayawise table to check with outlet and date

    // select the sume of detail and count of details  from indicator caluculation
    const submitdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/verification', postData2)
        const { success, message } = result.data
        if (success === 2) {
            const result2 = await axioslogin.post('/verification/oudetl', postData3)
            const { success } = result2.data
            if (success === 3) {
                const result3 = await axioslogin.post('/verification/getdetails', postData3)
                const { success, data, message } = result3.data;
                if (success === 3) {
                    const { initalass_nurse_diff, initalass_doctor_diff,
                        careplan_yn, handover_yn, incedence_yn,
                        bloodcomponent_wastage,
                        bloodcomponent_rctnoccured, ptntidntfnerror_yn,
                        equiputlzn_timediff,
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
                        equipment_utilization: equiputlzn_timediff,
                        datee: moment(datee).format("YYYY-MM-DD[T]HH:mm:ss"),
                        ou_code: ou_code
                    }
                    const result4 = await axioslogin.post('/verification/insert', frmdataa)

                    const { success, message } = result4.data

                    if (success === 1) {
                        succesNofity(message)
                        setOpen(false)
                    } else if (success === 0) {
                        warningNofity(message)
                        setOpen(false)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                        setOpen(false)
                    }
                } else if (success === 0) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured !!! Please Contact Edp ')
                }
            }
            else if (success === 2) {
                const result3 = await axioslogin.post('/verification/getdetails', postData3)
                const { success, data, message } = result3.data;
                if (success === 3) {
                    const { initalass_nurse_diff, initalass_doctor_diff,
                        careplan_yn, handover_yn, incedence_yn,
                        bloodcomponent_wastage,
                        bloodcomponent_rctnoccured, ptntidntfnerror_yn, equiputlzn_timediff,
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
                        equipment_utilization: equiputlzn_timediff,
                        datee: moment(datee).format("YYYY-MM-DD[T]HH:mm:ss"),
                        ou_code: ou_code
                    }

                    const result4 = await axioslogin.patch('/verification/edit', frmdataa)
                    const { success1, message } = result4.data

                    if (success1 === 2) {

                        succesNofity(message)
                        setOpen(false)
                    } else if (success1 === 0) {
                        warningNofity(message)
                    } else {

                        errorNofity('Error Occured !!! Please Contact Edp ')
                    }
                }
            }
            else if (success === 0) {
                warningNofity(message)
            }
            else {
                errorNofity('Error Occured !!! Please Contact Edp ')
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
            <ToastContainer />
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

                    <ModelapproverejectTable getid={getid} />

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






