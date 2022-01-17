import React, { Fragment, memo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextInput from 'src/views/Component/TextInput';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
const Modelapprovereject = ({ open, handleClose }) => {
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                // TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>{"Verify & Reject"}</DialogTitle>
                <DialogContent sx={{
                    minWidth: 300,
                    maxWidth: 600,
                    width: 600,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12 col-sm-12" >

                                <div className="row g-1 ">
                                    <div className="col-md-12 pt-1 pl-6">
                                        <RadioGroup row name="row-radio-buttons-group">
                                            <FormControlLabel
                                                value="approve"
                                                label="Approve"
                                                control={<Radio color="success" size="small" />}
                                            />

                                            <FormControlLabel
                                                value="reject"
                                                control={<Radio color="secondary" size="small" />}
                                                label="Reject"
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-12 col-sm-12 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder=" Reason For Cancel"
                                            fullWidth
                                        // value={}
                                        // name=""
                                        // changeTextValue={(e) => }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default Modelapprovereject
