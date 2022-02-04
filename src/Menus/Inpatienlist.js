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
    {
        component: CNavItem,
        name: 'Quality Verification',
        to: '/Home/Qualityverification',
    },
]

export default InPatientList;