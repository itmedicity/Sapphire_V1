import React, { Fragment, useState, memo } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DialogContent } from '@material-ui/core';
import TextInput from '../Component/TextInput';
import { Dialog, DialogActions } from '@mui/material';

const Modelcommon = ({ open, handleClose, submit, setuserid }) => {

    const [modeluserid, SetmodeluserId] = useState({
        // userid: ''
        us_code: ''
    })
    //   default state
    // 
    //  destructing object
    const { us_code
    } = modeluserid

    // getting data from the form
    const updateFormData = async (e) => {
        const value = e.target.value
        SetmodeluserId({ ...modeluserid, [e.target.name]: value })
    }
    setuserid(modeluserid)
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            // open={true} 
            >
                <DialogTitle>  Please Enter Your UserId</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Please enter your userId
                    </DialogContentText> */}
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="User Id"
                        changeTextValue={(e) => updateFormData(e)}
                        value={us_code}
                        name="us_code"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={submit}>save </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(Modelcommon)
