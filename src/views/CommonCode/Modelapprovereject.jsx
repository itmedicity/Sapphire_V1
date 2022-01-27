import React, { Fragment, memo, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModelapproverejectTable from './ModelapproverejectTable';
import { axioslogin } from '../Axios/Axios';
import { useParams } from 'react-router-dom';
import { errorNofity, succesNofity, warningNofity } from './Commonfunc';
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

    const submitdata = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/verificatioincharge', postData2)

        const { success, data, message } = result.data
        if (success === 1) {
            succesNofity(message)
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
                    <Button color="secondary" onClick={submitdata} >Approved</Button>
                    <Button onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(Modelapprovereject)






