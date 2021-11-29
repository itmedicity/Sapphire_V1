import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import BloodtypeOutlinedIcon from '@mui/icons-material/BloodtypeOutlined';
import AirlineSeatIndividualSuiteOutlinedIcon from '@mui/icons-material/AirlineSeatIndividualSuiteOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import AlignVerticalCenterOutlinedIcon from '@mui/icons-material/AlignVerticalCenterOutlined';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import BedIcon from '@mui/icons-material/Bed';
import { useHistory, useParams } from 'react-router';
import PatientCard from './PatientCard';
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';


const InpatientEdit = () => {
    const { id } = useParams()
    const history = useHistory()
    const insideAvatarFunction = () => {
        history.push(`/Home/Initialasssment/${id}`)
    }
    const outsideAvatarFunction = () => {
        history.push(`/Home/Initialasssmentdoc/${id}`)
    }
    const bloodComponentAvatar = () => {
        history.push(`/Home/Bloodcomponents/${id}`)
    }
    const dischargeavathar = () => {

        history.push(`/Home/Discharge/${id}`)
    }
    const nursepatientavathar = () => {
        history.push(`/Home/NursePatientratio/${id}`)
    }
    const dietitianFunction = () => {
        history.push(`/Home/Dietitian/${id}`)
    }
    const patientidenticnavathar = () => {
        history.push(`/Home/Patientidentfctnerror/${id}`)
    }
    const AppropriateHanover = () => {
        history.push(`/Home/HandoverComunication/${id}`)
    }
    const Reintubationrate = () => {
        history.push(`/Home/Reintubationrate/${id}`)
    }
    const EquipmentUtilization = () => {
        history.push(`/Home/EquipmentUtilization/${id}`)
    }
    const Returntoicu = () => {
        history.push(`/Home/Returntoicu/${id}`)
    }
    const careplanaction = () => {
        history.push(`/Home/Careplan/${id}`)
    }
    const Nutritionalscreening = () => {
        history.push(`/Home/NutritionalScreening/${id}`)
    }
    const sentinaleventReport = () => {
        history.push(`/Home/Sentinalevent/${id}`)
    }
    const nearmissess = () => {
        history.push(`/Home/Nearmissess/${id}`)
    }
    const incidencefall = () => {
        history.push(`/Home/Incidencefall/${id}`)
    }
    const utilizationbed = () => {
        history.push(`/Home/Bedutilizatinward/${id}`)
    }
    const availbleoccupancy = () => {
        history.push(`/Home/Bedoccupancy/${id}`)
    }

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
                                            <Grid item xs={12} md={4}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={insideAvatarFunction}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>
                                                                <AssignmentOutlinedIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Initial Assessment Nurse" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={outsideAvatarFunction}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>
                                                                <AssessmentOutlinedIcon
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Initial Assessement Doctor" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={AppropriateHanover}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <AddBusinessOutlinedIcon
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Appropriate Handover" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={Returntoicu}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <AccountTreeOutlinedIcon
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Return to ICU" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={dietitianFunction}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <FoodBankOutlinedIcon
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Dietitian" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={incidencefall}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <VisibilityOffRoundedIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Incidence Fall" />
                                                    </ListItem>

                                                </List>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                                                    <ListItem style={{ cursor: "pointer" }} onClick={bloodComponentAvatar}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>
                                                                <BloodtypeOutlinedIcon

                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="blood Component" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={EquipmentUtilization}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <AirlineSeatIndividualSuiteOutlinedIcon

                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Equipment Utilization" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={dischargeavathar}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <AddReactionOutlinedIcon
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Discharge" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={Reintubationrate}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <AlignVerticalCenterOutlinedIcon
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Re-Intubation Rate" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={sentinaleventReport}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <AddTaskOutlinedIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Sentinal Event Reported" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={nearmissess}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <ApprovalOutlinedIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Near Misses" />
                                                    </ListItem>

                                                </List>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={Nutritionalscreening}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <DonutLargeIcon
                                                                />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Nutritional Screening" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={careplanaction}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <ChildCareIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Care Plan" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={patientidenticnavathar}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <NearbyErrorIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Patient Identification Error" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={nursepatientavathar}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <AspectRatioIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Nurse Patient Ratio" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={availbleoccupancy}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <BedIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Bed Occupancy & Available ICU" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={utilizationbed}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#62757f', width: 50, height: 50 }}>

                                                                <BedIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Bed Occupany & Available in Ward" />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default InpatientEdit
