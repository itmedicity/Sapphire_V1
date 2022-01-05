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
import BedUtilizationIcu from '../InpatientICU/BedUtilizationIcu';
import Accodation from './Accodation';
import { COLOUR_ONE } from 'src/views/Constant/Constant';

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
    reintubateflag: ''
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
    reintubateflag
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
        reintubateflag: reintubation_flag
      }

      setFlagvalue(setdata)
    }
    flagdetail()
  }, [setFlagvalue])

  const array = [
    { comp: <IntialassessmentNurse />, style: { backgroundColor: COLOUR_ONE }, flag: flagNurse, nameheading: 'Intial Assement nurse' },
    { comp: <InitialassesmentDoctor />, style: { backgroundColor: '#fce4ec' }, flag: flagDoctor, nameheading: 'Intial Assement Doctor' },
    { comp: <Bloodcomponents />, style: { backgroundColor: '#f3e5f5' }, flag: blodcompflag, nameheading: 'Blood Component' },
    { comp: <Careplan />, style: { backgroundColor: '#ede7f6' }, flag: careflag, nameheading: 'Care Plan' },
    { comp: <EquipmentUtilization />, style: { backgroundColor: '#e8eaf6' }, flag: eqpmutiltnfalg, nameheading: 'Equipment Utilization' },
    { comp: <HandoverComunication />, style: { backgroundColor: '#e3f2fd' }, flag: HandoverComflag, nameheading: 'Handover Communication' },
    { comp: <NutritionalScreening />, style: { backgroundColor: '#e1f5fe' }, flag: nutrscreenflag, nameheading: 'Nutritional Screening ' },
    { comp: <Dietitian />, style: { backgroundColor: '#e0f7fa' }, flag: dietetian, nameheading: 'Dietitian' },
    { comp: <Nearmissess />, style: { backgroundColor: '#e0f2f1' }, flag: nearmis, nameheading: 'Near Misses' },
    { comp: <NursePatientratio />, style: { backgroundColor: '#e8f5e9' }, flag: nusrptntrati, nameheading: 'Nurse Patient Ratio' },
    { comp: <Patientidentfctnerror />, style: { backgroundColor: '#f9fbe7' }, flag: patientiderrflag, nameheading: 'Patient Identification Error' },
    { comp: <Sentinalevent />, style: { backgroundColor: '#f9fbe7' }, flag: sentriflag, nameheading: 'Sentinal Event' },
    { comp: <Discharge />, style: { backgroundColor: '#f9fbe7' }, flag: dischargeflag, nameheading: 'Discharge' },
    { comp: <BedutilizationWardNew />, style: { backgroundColor: '#f9fbe7' }, flag: dischargeflag, nameheading: 'Bed Utilization Ward' },
    { comp: <BedUtilizationIcu />, style: { backgroundColor: '#e0f7fa' }, flag: dischargeflag, nameheading: 'Bed Utilization ICU' },
    { comp: <Returntoicu />, style: { backgroundColor: '#e0f7fa' }, flag: dietetian, nameheading: 'Return To ICU' },
    { comp: <Incidence />, style: { backgroundColor: '#e0f7fa' }, flag: incedebnceflag, nameheading: 'Incidence Fall' },
    { comp: <Reintubation />, style: { backgroundColor: '#e0f7fa' }, flag: reintubateflag, nameheading: 'Reintubation Flag' },

  ]

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

                  {
                    array.map((val, index) => {
                      return <Accodation key={index} style={val.style} flagNurse={val.flag} nameheading={val.nameheading}>
                        {val.comp}
                      </Accodation>
                    })
                  }
                  {/* <Accodation >
                    <IntialassessmentNurse />
                  </Accodation> */}
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
