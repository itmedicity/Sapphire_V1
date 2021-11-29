import React from 'react'

const HomePage = React.lazy(() => import('./views/Home/Home'))
const Outpatient = React.lazy(() => import('./views/Quality/Outpatient/Outpatientmast'))
const Inpatient = React.lazy(() => import('./views/Quality/Inpatient/InpatientList'))
const InpatientEdit= React.lazy(()=>import('./views/Quality/Inpatient/InpatientEdit'))
const Initialasssment = React.lazy(() => import('./views/Quality/InitialAssesment/IntialassessmentNurse'))
const Initialasssmentdoc = React.lazy(() => import('./views/Quality/InitialAssesment/InitialassessmentDoctor'))
const HandoverComunication = React.lazy(() => import('./views/Quality/InpatientICU/HandoverComunication'))
const Reintubation = React.lazy(() => import('./views/Quality/InpatientICU/Reintubation'))
const EquipmentUtilization = React.lazy(() => import('./views/Quality/InpatientICU/EquipmentUtilization'))
const Returntoicu = React.lazy(() => import('./views/Quality/InpatientICU/Returntoicu'))
const Careplan = React.lazy(() => import('./views/Quality/InpatientICU/Careplan'))
const NutritionalAssessment = React.lazy(() => import('./views/Quality/InpatientICU/NutritionalAssessment'))
const NutritionalScreening = React.lazy(() => import('./views/Quality/InpatientICU/NutritionalScreening'))
const Bloodcomponents = React.lazy(() => import('./views/Quality/Wards/Bloodcomponents'))
const Discharge = React.lazy(() => import('./views/Quality/Wards/Discharge'))
const NursePatientratio = React.lazy(() => import('./views/Quality/Wards/NursePatientratio'))
const Nurseratiocard = React.lazy(() => import('./views/Quality/Wards/Nurseratiocard'))
const Dietitian = React.lazy(() => import('./views/Quality/Wards/Dietitian'))
const Patientidentfctnerror = React.lazy(() => import('./views/Quality/Wards/Patientidentfctnerror'))
const Sentinalevent = React.lazy(() => import('./views/Quality/Wards/Sentinalevent'))
const Nearmissess = React.lazy(() => import('./views/Quality/Wards/Nearmissess'))
const Incidencefall = React.lazy(() => import('./views/Quality/Wards/Incidence'))
const Bedutilizatinward = React.lazy(() => import('./views/Quality/Wards/Bedutilizatinward'))
const Bedoccupancy = React.lazy(() => import('./views/Quality/InpatientICU/Bedoccupancy'))
const Casuality = React.lazy(() => import('./views/Quality/Casuality/CasulityPatients'))
const CasualityEdit = React.lazy(() => import('./views/Quality/Casuality/CasualityEdit'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: HomePage },
  { path: '/Home/Outpatient', exact: true, name: 'Outpatient', component: Outpatient },
  { path: '/Home/Inpatienlist', exact: true, name: 'Inpatient', component: Inpatient },
  { path: '/Home/InpatientEdit/:id', exact: true, name: 'InpatientEdit', component: InpatientEdit },
  { path: '/Home/Initialasssment/:id', exact: true, name: 'Initialasssment', component: Initialasssment },
  { path: '/Home/Initialasssmentdoc/:id', exact: true, name: 'Initialasssmentdoc', component: Initialasssmentdoc },
  { path: '/Home/HandoverComunication/:id', exact: true, name: 'HandoverComunication', component: HandoverComunication },
  { path: '/Home/Reintubationrate/:id', exact: true, name: 'ReIntubation Rate', component: Reintubation },
  { path: '/Home/EquipmentUtilization/:id', exact: true, name: 'ReIntubation Rate', component: EquipmentUtilization },
  { path: '/Home/Returntoicu/:id', exact: true, name: 'ReIntubation Rate', component: Returntoicu },
  { path: '/Home/Careplan/:id', exact: true, name: 'Careplan', component: Careplan },
  { path: '/Home/Nutritionalscreening/:id', exact: true, name: 'Nutritionalscreening', component: NutritionalScreening },
  { path: '/Home/Nutritionalassessment/:id', exact: true, name: 'Nutritionalassessment', component: NutritionalAssessment },
  { path: '/Home/Bloodcomponents/:id', exact: true, name: 'BloodComponents', component: Bloodcomponents },
  { path: '/Home/Discharge/:id', exact: true, name: 'Discharge', component: Discharge },
  { path: '/Home/NursePatientratio/:id', exact: true, name: 'NursePatientratio', component: NursePatientratio },
  { path: '/Home/Nurseratiocard', exact: true, name: 'Nurseratiocard', component: Nurseratiocard },
  { path: '/Home/Dietitian/:id', exact: true, name: 'Dietitian', component: Dietitian },
  { path: '/Home/Patientidentfctnerror/:id', exact: true, name: 'Patientidentfctnerror', component: Patientidentfctnerror },
  { path: '/Home/Sentinalevent/:id', exact: true, name: 'Sentinalevent', component: Sentinalevent },
  { path: '/Home/Nearmissess/:id', exact: true, name: 'Nearmissess', component: Nearmissess },
  { path: '/Home/Incidencefall/:id', exact: true, name: 'Incidencefall', component: Incidencefall },
  { path: '/Home/Bedutilizatinward/:id', exact: true, name: 'Bedutilizatinward', component: Bedutilizatinward },
  { path: '/Home/Bedoccupancy/:id', exact: true, name: 'Bedoccupancy', component: Bedoccupancy },
  { path: '/Home/Nurseratiocard', exact: true, name: 'Nurseratiocard', component: Nurseratiocard },
  { path: '/Home/CasualitypatientList', exact: true, name: 'Casuality', component: Casuality },
  { path: '/Home/CasualityEdit/:id', exact: true, name: 'Casuality Edit ', component: CasualityEdit },
]

// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/Home/TestOne', name: 'Test Component', component: TestComponent },
//   { path: '/Home/Test', name: 'Test Component', component: TestTwo },
//   { path: '/Home/Settings', name: 'Settings', component: Settings },
// ]

export default routes
