import React from 'react'

const HomePage = React.lazy(() => import('./views/Home/Home'))
const Outpatient = React.lazy(() => import('./views/Quality/Outpatient/Outpatientmast'))
const Inpatient = React.lazy(() => import('./views/Quality/Inpatient/InpatientList'))
const InpatientEditnew = React.lazy(() => import('./views/Quality/Inpatient/InpatientEditnew'))
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
const BedutilizationWardNew = React.lazy(() => import('./views/Quality/Wards/BedutilizationWardNew'))
const BedUtilizationIcu = React.lazy(() => import('./views/Quality/InpatientICU/BedUtilizationIcu'))
const Bedoccupancy = React.lazy(() => import('./views/Quality/InpatientICU/Bedoccupancy'))
const Casuality = React.lazy(() => import('./views/Quality/Casuality/CasulityPatients'))
const CasualityEdit = React.lazy(() => import('./views/Quality/Casuality/CasualityEdit'))
const Inchargeverftn = React.lazy(() => import('./views/Quality/Verification/Inchargeverfictn'))
const AcnoVerification = React.lazy(() => import('./views/Quality/Verification/Acnoverification'))
const Qualityverification = React.lazy(() => import('./views/Quality/Verification/Qualityverifcation'))
// const InpatientEditnew = React.lazy(() => import('./views/Quality/Inpatient/InpatientEditnew'))
const InitialAssesmentNursetnew = React.lazy(() => import('./views/Quality/InitialAssesment/InitialAssesmentNurseNew'))
const InchargeVerification = React.lazy(() => import('./views/Quality/Opverification/InchargeVerification'))
const AcnoVerifications = React.lazy(() => import('./views/Quality/Opverification/AcnoVerificationop'))
// const Acnoverifytableop = React.lazy(() => import('./views/Quality/Opverification/Acnoverifytableop'))
const Qualityverifcation = React.lazy(() => import('./views/Quality/Opverification/QualityVerification'))
const Reportall = React.lazy(() => import('./views/Quality/ReportOP/Reportopoverall'))
const Monthlyreport = React.lazy(() => import('./views/Quality/ReportOP/Monthlyreportdetl'))
const Opbenchmark = React.lazy(() => import('./views/Quality/Opbenchmark/Opbenchmark'))
// const Summaryreportdetl = React.lazy(() => import('./views/Quality/ReportOP/Summaryreport'))
const SummaryOpreport = React.lazy(() => import('./views/Quality/ReportOP/SummaryOpreport'))
const Settings = React.lazy(() => import('./Menus/Settings'))
//const OutpatientNew = React.lazy(() => import('./views/Quality/Outpatient/OutpatientTableNew'))




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: HomePage },
  { path: '/Home/Outpatient', exact: true, name: 'Outpatient', component: Outpatient },
  { path: '/Home/Inpatienlist', exact: true, name: 'Inpatient', component: Inpatient },
  { path: '/Home/InpatientEditnew/:id', exact: true, name: 'InpatientEdit', component: InpatientEditnew },
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
  { path: '/Home/BedutilizationWardNew/:id', exact: true, name: 'BedutilizationWardNew', component: BedutilizationWardNew },
  { path: '/Home/BedUtilizationIcu/:id', exact: true, name: 'BedUtilizationIcu', component: BedUtilizationIcu },
  { path: '/Home/Bedoccupancy', exact: true, name: 'Bedoccupancy', component: Bedoccupancy },
  { path: '/Home/Nurseratiocard', exact: true, name: 'Nurseratiocard', component: Nurseratiocard },
  { path: '/Home/CasualitypatientList', exact: true, name: 'Casuality', component: Casuality },
  // { path: '/Home/ReportOp', exact: true, name: 'Report Op', component: ReportOp },
  { path: '/Home/CasualityEdit/:id', exact: true, name: 'Casuality Edit ', component: CasualityEdit },
  { path: '/Home/Inchargeverification', exact: true, name: 'Incharge Verification', component: Inchargeverftn },
  { path: '/Home/AcnoVerification', exact: true, name: 'Acno Verification', component: AcnoVerification },
  { path: '/Home/Qualityverification', exact: true, name: 'Quality verification', component: Qualityverification },
  // { path: '/Home/InpatientEditnew', exact: true, name: 'InpatientEditnew', component: InpatientEditnew },
  { path: '/Home/InitialAssesmentNurseNew', exact: true, name: 'initial Assessment Nurse New', component: InitialAssesmentNursetnew },
  { path: '/Home/OP/InchargeVerification/:id', exact: true, name: 'OpInchargeVerification', component: InchargeVerification },
  { path: '/Home/OP/AcnoVerifications/', exact: true, name: 'AcnoVerifications', component: AcnoVerifications },
  { path: '/Home/OP/Qualityverifcation/', exact: true, name: 'Qualityverifcation', component: Qualityverifcation },
  { path: '/Home/Reportall/', exact: true, name: 'Report all', component: Reportall },
  // { path: '/Home/Acnoverifytableop/', exact: true, name: 'Acnoverifytableop', component: Acnoverifytableop },
  { path: '/Home/Reportall/Month/', exact: true, name: 'Monthlyreport', component: Monthlyreport },
  { path: '/Home/Opbenchmark/year/', exact: true, name: 'Opbenchmark', component: Opbenchmark },
  // { path: '/Home/Summaryreportdetl/year/', exact: true, name: 'Summaryreportdetl', component: Summaryreportdetl },
  { path: '/Home/SummaryOpreport/year/', exact: true, name: 'SummaryOpreport', component: SummaryOpreport },
  { path: '/Home/Settings', name: 'Settings', component: Settings },
  //{ path: '/Home/OutpatientNew', exact: true, name: 'Outpatient New', component: OutpatientNew },
]

// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/Home/TestOne', name: 'Test Component', component: TestComponent },
//   { path: '/Home/Test', name: 'Test Component', component: TestTwo },
//   { path: '/Home/Settings', name: 'Settings', component: Settings },
// ]

export default routes
