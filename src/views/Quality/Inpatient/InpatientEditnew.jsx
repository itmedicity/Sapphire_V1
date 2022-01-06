import {
  Accordion, AccordionDetails, AccordionSummary, Card,
  CardHeader, Divider, Typography
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
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
import Returntoicu from '../InpatientICU/Returntoicu';
import { axioslogin } from 'src/views/Axios/Axios';
import { useParams } from 'react-router';
import moment from 'moment'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { differenceInHours } from 'date-fns'
import Reintubation from '../InpatientICU/Reintubation';
import { green, pink, red } from '@mui/material/colors';
import BedutilizationWardNew from '../Wards/BedutilizationWardNew';
import { MdPublishedWithChanges } from "react-icons/md";
const InpatientEditnew = () => {
  const { id } = useParams()

  //setting the date for return to icu
  const [datevalue, setDatevalue] = useState(false)
  const [flagsetvalue, setFlagvalue] = useState({
    flagNurse: '',
    flagDoctor: '',
    blodcompflag: '',
    careflag: '',
    eqpmutiltnfalg: '',
    HandoverComflag: '',
    nutrscreenflag: '',
    dietetian: '',
    nearmis: '',
    nusrptntrati: '',
    patientiderrflag: '',
    sentriflag: '',
    dischargeflag: '',
    incedebnceflag: '',
    reintubateflag: '',
    bedoccupward_flag: ''
  })

  //  destructure

  const {
    flagNurse,
    flagDoctor,
    blodcompflag,
    careflag,
    eqpmutiltnfalg,
    HandoverComflag,
    nutrscreenflag,
    dietetian,
    nearmis,
    nusrptntrati,
    patientiderrflag,
    sentriflag,
    dischargeflag,
    incedebnceflag,
    reintubateflag,
    bedoccupward_flag
  } = flagsetvalue

  useEffect(() => {
    const returnicudate = async () => {
      const result = await axioslogin.get(`/returntoIcu/shf/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        const { shift_frm_icu,
          inpt_slno
        } = data[0]
        const datetime = moment(shift_frm_icu).format("YYYY-MM-DD[T]HH:mm:ss")
        const currdate = moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss")
        const result = differenceInHours(new Date(currdate), new Date(datetime));


        if (result <= 48) {
          setDatevalue(false)
        } else {
          setDatevalue(true)
        }
      }
      else if (success === 2) {
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    returnicudate()


  }, [id])





  useEffect(() => {
    ///complete or Pending
    const flagdetail = async () => {
      const result = await axioslogin.get(`/common/getflgdetl/fgdetil/${id}`)
      const { success, data } = result.data

      const {
        bedoccupicu_flag,
        bedoccupward_flag,
        bloodcomponent_flag,
        communicationerror_flag,
        diet_flag,
        discharge_flag,
        equipmentutilization_flag,
        ia_doctor_flag,
        ia_nurse_flag,
        if_flag,
        inpt_flag,
        inpt_slno,
        nearmisses_flag,
        nrs_care_flag,
        nrse_ptnt_ratio,
        nut_screen_flag,
        nutritionneed_flaG,
        patientcare_flag,
        pie_flag,
        reintubation_flag,
        return_to_icu_flag,
        sentinal_flag
      } = data[0]

      var setdata = {
        flagNurse: ia_nurse_flag,
        flagDoctor: ia_doctor_flag,
        blodcompflag: bloodcomponent_flag,
        careflag: nrs_care_flag,
        eqpmutiltnfalg: equipmentutilization_flag,
        HandoverComflag: communicationerror_flag,
        nutrscreenflag: nut_screen_flag,
        dietetian: diet_flag,
        nearmis: nearmisses_flag,
        nusrptntrati: nrse_ptnt_ratio,
        patientiderrflag: pie_flag,
        sentriflag: sentinal_flag,
        dischargeflag: discharge_flag,
        incedebnceflag: if_flag,
        reintubateflag: reintubation_flag,
        bedoccupward_flag: bedoccupward_flag
      }

      setFlagvalue(setdata)
    }
    flagdetail()
  }, [setFlagvalue])

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

                      expandIcon={<MdPublishedWithChanges
                        // style={{ color: green[500] }}

                        size={25} style={flagNurse === 'Y' ? { color: green[500] } : { color: red[500] }}
                      />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={flagDoctor === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges />, < MdPublishedWithChanges size={25} style={blodcompflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={careflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={eqpmutiltnfalg === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={HandoverComflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={nutrscreenflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={dietetian === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={nearmis === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={nusrptntrati === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={patientiderrflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={sentriflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={dischargeflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                      expandIcon={<MdPublishedWithChanges size={25} style={bedoccupward_flag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                  <Accordion
                    disabled={datevalue}
                  >
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<MdPublishedWithChanges size={25} style={flagNurse === 'Y' ? { color: green[500] } : { color: red[500] }} />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    // disabled={datevalue}
                    >
                      <Typography display="block" fontSize={18} >Return to ICU</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Returntoicu />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>


                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<MdPublishedWithChanges size={25} style={incedebnceflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
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
                  <Accordion>
                    <AccordionSummary
                      style={{
                        backgroundColor: '#f9fbe7'
                      }}
                      expandIcon={<MdPublishedWithChanges size={25} style={reintubateflag === 'Y' ? { color: green[500] } : { color: red[500] }} />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography display="block" fontSize={18}>ReIntubation Rate</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Reintubation />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
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
