import React from 'react'
import {
  IoHome,
  IoCalendarOutline,
  IoDocumentAttachOutline,
  IoPeopleOutline,
} from 'react-icons/io5'
import { GoDiff } from "react-icons/go";
import { IoIosGitNetwork } from "react-icons/io";
import { VscMortarBoard, VscLaw, VscFeedback } from "react-icons/vsc";
import { CNavGroup, CNavItem } from '@coreui/react'
import InPatientList from './Menus/Inpatienlist';
import OutPatientList from './Menus/OutPatientList';
import CasualitypatientList from './Menus/CasualitypatientList';

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


]

export default _nav

