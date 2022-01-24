import React, { Fragment, memo, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModelapproverejectTable from './ModelapproverejectTable';
const Modelapprovereject = ({ open, handleClose, getid }) => {


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
                    <Button color="primary" >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>

                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(Modelapprovereject)






{/* <div className="card">
                        <div className="card-body">

                            <div className="col-md-12 col-sm-12" >
                                <div className="row g-1">
                                    <div className="col-md-6 pb-1">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Typography fontSize={16} noWrap={true} >Initial Assessment Nurse</Typography>
                                            </div>
                                            <div className="col-md-6">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Difference "
                                                    disabled="Disabled"
                                                    value={modelData.initialassNurse}
                                                    name="modelData.initialassNurse"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 pb-1">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Typography fontSize={16} noWrap={true} >Initial Assessment Doctor</Typography>
                                            </div>
                                            <div className="col-md-6">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Difference"
                                                    disabled="Disabled"
                                                    value={modelData.initialassDoc}
                                                    name="modelData.initialassDoc"
                                                />

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row g-1">
                                    <div className="col-md-6">
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <Typography fontSize={16} noWrap={true} >Care Plan</Typography>
                                            </div>
                                            <div className="col-md-6">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Difference "
                                                    disabled="Disabled"
                                                    value={modelData.careplan}
                                                    name="modelData.careplan"
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Typography fontSize={16} noWrap={true} >Communication error</Typography>
                                            </div>
                                            <div className="col-md-6">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Difference"
                                                    disabled="Disabled"
                                                    value={modelData.communicatinerr}
                                                    name="modelData.communicatinerr"
                                                />

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div> */}
{/* </div> */ }
{/* </div> */ }