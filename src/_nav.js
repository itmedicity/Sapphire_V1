import React from 'react'
import {
  IoHome,
  IoCalendarOutline,
  IoDocumentAttachOutline,
  IoPeopleOutline,
} from 'react-icons/io5'

import { CNavGroup, CNavItem } from '@coreui/react'
import InPatientList from './Menus/Inpatienlist';
import OutPatientList from './Menus/OutPatientList';
import CasualitypatientList from './Menus/CasualitypatientList';
import Incharge from './Menus/Incharge';
import ReportOp from './Menus/ReportOp';
// i  mport OPBenchmark from './Menus/OpBenchmark';
const _nav = [
  {
    slno: 1,
    component: CNavItem,
    name: 'Home',
    to: '/Home',
    icon: <IoHome className="text-info nav-icon" size={20} />,
  },
  {
    slno: 2,
    component: CNavGroup,
    name: 'Inpatient',
    icon: <IoCalendarOutline className="text-light nav-icon" size={20} color="#ee98fb" />,
    items: InPatientList
  },
  {
    slno: 3,
    component: CNavGroup,
    name: 'Out Patient',
    icon: <IoDocumentAttachOutline className="text-light nav-icon" size={20} />,
    items: OutPatientList
  },
  {
    slno: 4,
    component: CNavGroup,
    name: 'Casuality',
    icon: <IoPeopleOutline className="text-light nav-icon" size={20} />,
    items: CasualitypatientList
  },
  // {
  //   slno: 4,
  //   component: CNavGroup,
  //   name: 'Verification',
  //   icon: <IoPeopleOutline className="text-light nav-icon" size={20} />,
  //   items: Incharge
  // },
  {
    slno: 5,
    component: CNavGroup,
    name: 'Report OP',
    icon: <IoPeopleOutline className="text-light nav-icon" size={20} />,
    items: ReportOp
  },
  // {
  //   slno: 5,
  //   component: CNavGroup,
  //   name: 'OP Benchmark',
  //   icon: <IoPeopleOutline className="text-light nav-icon" size={20} />,
  //   items: OPBenchmark
  // },

]

export default _nav

