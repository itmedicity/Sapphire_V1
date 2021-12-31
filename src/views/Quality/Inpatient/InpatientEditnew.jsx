import {
  Accordion, AccordionDetails, AccordionSummary, Card,
  CardHeader, Divider, Typography
} from '@mui/material'
import React, { Fragment } from 'react'
import PatientCardNew from './PatientCardNew';
import InitialAssesmentNurseNew from '../InitialAssesment/InitialAssesmentNurseNew';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BloodtypeSharpIcon from '@mui/icons-material/BloodtypeSharp';
import SelfImprovementSharpIcon from '@mui/icons-material/SelfImprovementSharp';
import HomeRepairServiceSharpIcon from '@mui/icons-material/HomeRepairServiceSharp';
import ContactPhoneSharpIcon from '@mui/icons-material/ContactPhoneSharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import EmojiFoodBeverageSharpIcon from '@mui/icons-material/EmojiFoodBeverageSharp';
import RuleSharpIcon from '@mui/icons-material/RuleSharp';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReportIcon from '@mui/icons-material/Report';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Bloodcomponents from '../Wards/Bloodcomponents';
import SaveIcon from '@mui/icons-material/Save';
import IntialassessmentNurse from '../InitialAssesment/IntialassessmentNurse';
import InitialassesmentDoctor from '../InitialAssesment/InitialassessmentDoctor';
import EquipmentUtilization from '../InpatientICU/EquipmentUtilization';
import Discharge from '../Wards/Discharge';
import HandoverComunication from '../InpatientICU/HandoverComunication';
import Nearmissess from '../Wards/Nearmissess';
import Patientidentfctnerror from '../Wards/Patientidentfctnerror';
import Sentinalevent from '../Wards/Sentinalevent';
import Incidence from '../Wards/Incidence';
import Careplan from '../InpatientICU/Careplan';
import NursePatientratio from '../Wards/NursePatientratio';
import Dietitian from '../Wards/Dietitian';
import NutritionalScreening from '../InpatientICU/NutritionalScreening';
import BedutilizationWardNew from '../Wards/BedutilizationWardNew';

const InpatientEditnew = () => {
  return (
    <Fragment>
      <div className="card "
        style={
          {
            borderRadius: 20,
            top: '10%',
            bottom: '10%',
          }
        }
      >
        <CardHeader
          titleTypographyProps={{
            variant: 'button',
          }}
          title="Quality Indicators"
          sx={{
            textAlign: "left",
            paddingY: 1
          }}
        />
        <Divider variant="middle" />
        <div className="card-body align-items-around"
          style={
            {
              backgroundColor: '#EEF4F7',
              height: '50%'
            }
          } >
          <div className="row g-1 ">
            <div className="col-md-3 col-sm-12 d-flex justify-content-around ">
              <PatientCardNew />
            </div>
            <div className="col-md-9 justify-content-around">
              <div className="col-md-11 col-lg-12">
                <Card sx={{ borderRadius: 8, boxShadow: 10 }}>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#ffebee'
                      }}
                      expandIcon={<FormatAlignJustifyIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      align="center"
                    >
                      <Typography display="block" fontSize={18}>  Initial Assessment Nurse </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <IntialassessmentNurse />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#fce4ec'
                      }}
                      expandIcon={<FormatListBulletedIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography fontSize={18} display="block">Initial Assessment Doctor</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <InitialassesmentDoctor />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion >
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f3e5f5'
                      }}
                      expandIcon={<BloodtypeSharpIcon />, < SaveIcon />}
                      //  expandIcon={< SaveIcon/>}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography display="block" fontSize={18} >Blood Component</Typography>
                    </AccordionSummary >
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Bloodcomponents />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#ede7f6'
                      }}
                      expandIcon={<SelfImprovementSharpIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Care Plan</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Careplan />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#e8eaf6'
                      }}
                      expandIcon={<HomeRepairServiceSharpIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Equipment Utilization</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <EquipmentUtilization />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#e3f2fd'
                      }}
                      expandIcon={<ContactPhoneSharpIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>HandOver Communication</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'} >
                        <HandoverComunication />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#e1f5fe'
                      }}
                      expandIcon={<AssessmentSharpIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Nutritional Screening</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <NutritionalScreening />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#e0f7fa'
                      }}
                      expandIcon={<EmojiFoodBeverageSharpIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Dietitian</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Dietitian />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#e0f2f1'
                      }}
                      expandIcon={<RuleSharpIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Near Misses</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Nearmissess />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#e8f5e9'
                      }}
                      expandIcon={<PeopleOutlineIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Nurse Patient Ratio</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <NursePatientratio />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f1f8e9'
                      }}
                      expandIcon={<ReportIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}> Patient Identification Error</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Patientidentfctnerror />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<EventBusyIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Sentinal Event</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Sentinalevent />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<EventBusyIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Discharge</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Discharge />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<EventBusyIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Bed Utilization Ward</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <BedutilizationWardNew />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>







                  {/* <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<EventBusyIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Bed Occupancy ICU</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                      </Typography>
                    </AccordionDetails>
                  </Accordion> */}
                  {/* <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<EventBusyIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Return to ICU</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                      </Typography>
                    </AccordionDetails>
                  </Accordion> */}
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<EventBusyIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>Incidence of Fall</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component={'span'} variant={'body2'}>
                        <Incidence />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  {/* <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<EventBusyIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>ReIntubation Rate</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                      </Typography>
                    </AccordionDetails>
                  </Accordion> */}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default InpatientEditnew
