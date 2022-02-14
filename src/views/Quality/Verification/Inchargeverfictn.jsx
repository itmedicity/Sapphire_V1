import React, { Fragment, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { MdCheckCircle } from "react-icons/md"
import { FcOk, FcHighPriority } from "react-icons/fc";
import { useHistory } from 'react-router';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Modelapprovereject from 'src/views/CommonCode/Modelapprovereject';
import { FcViewDetails } from "react-icons/fc";
import { ToastContainer } from 'react-toastify'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import {
    IconButton
} from '@mui/material'
import TextInput from 'src/views/Component/TextInput';
const Inchargeverfictn = ({ update }) => {
    const [tableData, setTableDataa] = useState([])
    const [userid, setuserid] = useState({
        us_code: ''
    })
    const [getid, setgetId] = useState([])
    //Table
    const title = [
        {
            title: "SlNo", field: "inpt_slno",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        // {
        //     title: "Date", field: "ipd_date",
        //     cellStyle: { minWidth: 5, maxWidth: 10 },
        // },
        {
            title: "MRD No", field: "pt_no",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Name", field: "ptc_ptname",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Sex", field: "ptc_sex",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Status", field: "Status",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Summary", field: "Summary",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
    ]
    const [open, setOpen] = useState(false);
    const handleopenmodel = (inpt_slno) => {
        setgetId(inpt_slno)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // use effect for set complete or incomplete the indicator indication
    useEffect(() => {
        const getsetTablelistt = async () => {
            const result = await axioslogin.get(`/verification/${4001}`)
            const { success, message, data } = result.data
            if (success === 2) {
                const formtable = data.map((val) => {
                    const d1 = {
                        inpt_slno: val.inpt_slno,
                        ipd_date: val.ipd_date,
                        Status: (val.bedoccupicu_flag === 'Y' && val.bedoccupward_flag === 'Y' && val.bloodcomponent_flag === 'Y'
                            && val.casualityian_flag === 'Y' && val.communicationerror_flag === 'Y' && val.diet_flag === 'Y' &&
                            val.discharge_flag === 'Y' && val.equipmentutilization_flag === 'Y' && val.ia_doctor_flag === 'Y'
                            && val.ia_nurse_flag === 'Y' && val.if_flag === 'Y' && val.nearmisses_flag === 'Y' && val.nrs_care_flag === 'Y' &&
                            val.nrse_ptnt_ratio === 'Y' && val.nut_screen_flag === 'Y' && val.nutritionneed_flaG === 'Y' &&
                            val.patientcare_flag === 'Y' && val.pie_flag === 'Y' && val.reintubation_flag === 'Y' &&
                            val.return_to_icu_flag === 'Y' && val.sentinal_flag === 'Y') ? <FcOk size={25} /> : <FcHighPriority size={25} />,
                        pt_no: val.pt_no,
                        ptc_ptname: val.ptc_ptname,
                        ptc_sex: val.ptc_sex,
                        Summary: <IconButton onClick={(e) => { handleopenmodel(val.inpt_slno) }}>
                            < FcViewDetails size={25} />
                        </IconButton>
                    }
                    return d1
                })
                setTableDataa(formtable)
            }
            else if (success === 0) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getsetTablelistt()
    }, [update])
    const history = useHistory()
    const gettablecontent = async (tableData) => {
        const { inpt_slno } = tableData
        history.push(`/Home/InpatientEditnew/${inpt_slno}`)
    }

    //Load another model  

    return (
        < Fragment >
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Verification Patient List</h5>
                </div>
                <div className="card-body">
                    {open === true ? <Modelapprovereject open={open} handleClose={handleClose} getid={getid} setOpen={setOpen} handleopenmodel={handleopenmodel} /> : null}
                    <MaterialTable
                        title="Verification"
                        data={tableData}
                        columns={title}
                        icons={tableIcons}
                        selection={true}
                        actions={[
                            {
                                icon: () =>
                                    <EditOutlinedIcon />,
                                tooltip: 'Click to edit',
                                onClick: (e, tableData) => gettablecontent(tableData),
                                position: "row"
                            },
                        ]}
                        options={{
                            paginationType: "stepped",
                            showFirstLastPageButtons: false,
                            padding: "dense",
                            actionsColumnIndex: 0
                        }} />
                </div>
            </div >
        </Fragment >
    )
}
export default Inchargeverfictn




