
import React, { Fragment, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import { useHistory, useParams } from 'react-router'
import PatientCard from '../Inpatient/PatientCard'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import CasualityIntialAssessment from './CasualityIntialAssessment';
import ReturntoCasuality from './ReturntoCasuality';

const CasualityEdit = () => {
    const { id } = useParams()
    const history = useHistory()

    const [toggle, setToggle] = useState(0)



    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card" style={{ backgroundColor: "#eff4f8" }} >
                <div className="card-body">
                    <div className="row p-0"  >
                        <div className="col-md-3 col-sm-12" >
                            <PatientCard id={id} />
                        </div>
                        <div className="col-md-9 col-sm-12 pl-0">
                            <div className="card"  >

                                <div className="card-body">
                                    <div className="row">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem style={{ cursor: "pointer" }}

                                                        onClick=
                                                        {(e) => { setToggle(1) }}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>
                                                                <AssignmentOutlinedIcon

                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Initial Assessment Nurse" />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                                                    <ListItem style={{ cursor: "pointer" }}

                                                        onClick=
                                                        {(e) => { setToggle(2) }}>

                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>
                                                                <BloodtypeOutlinedIcon

                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Return To Casuality" />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    {toggle === 1 ? <CasualityIntialAssessment /> : null}
                                </div>
                                <div className="col-md-12">
                                    {toggle === 2 ? <ReturntoCasuality /> : null}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment >
    )
}

export default CasualityEdit
