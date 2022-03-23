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

const Modelrejectop = ({ open, handleClose, getid, setOpen, handleopenmodel }) => {
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={'md'}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle style={{ alignContent: 'center', fontSize: '22' }}>{"Difference"}</DialogTitle>
                <DialogContent sx={{
                    minWidth: 500,
                    maxWidth: 900,
                    width: 900,
                }}>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default Modelrejectop