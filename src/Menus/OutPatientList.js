import { CNavItem } from "@coreui/react";
const OutPatientList = [
    {
        component: CNavItem,
        name: 'Patient List',
        to: '/Home/Outpatient',
    },
    {
        component: CNavItem,
        name: 'Incharge Verification',
        to: '/Home/OP/InchargeVerification/:id',
    },
    {
        component: CNavItem,
        name: 'Acno Verification',
        to: '/Home/OP/AcnoVerifications/',
    },
    {
        component: CNavItem,
        name: 'Quality Verification',
        to: '/Home/OP/Qualityverifcation/',
    },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Bulk Updation',
    //     to: '/home',
    // },
]

export default OutPatientList;