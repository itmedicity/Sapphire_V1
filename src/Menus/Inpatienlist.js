import { CNavItem } from "@coreui/react";
const InPatientList = [
    {
        component: CNavItem,
        name: 'Patient List',
        to: '/Home/Inpatienlist',
    },
    {
        component: CNavItem,
        name: 'Incharge Verification',
        to: '/Home/Inchargeverification',
    },
    {
        component: CNavItem,
        name: 'ACNO Verification',
        to: '/Home/AcnoVerification',
    },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Bulk Updation',
    //     to: '/home',
    // },
]

export default InPatientList;