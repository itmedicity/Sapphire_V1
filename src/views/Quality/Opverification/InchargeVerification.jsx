import React, { Fragment, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { MdCheckCircle } from "react-icons/md"
import { FcOk, FcHighPriority } from "react-icons/fc";
import { useHistory } from 'react-router';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import Modelrejectop from 'src/views/CommonCode/Modelrejectop';
// import { FcViewDetails } from "react-icons/fc";
import { ToastContainer } from 'react-toastify'
import { userslno } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import {
    IconButton
} from '@mui/material'

const InchargeVerification = ({ update }) => {

    const [tableData, setTableDataa] = useState([])
    const [userid, setuserid] = useState({
        us_code: ''
    })

    const [color, setcolor] = useState(true)
    const [getid, setgetId] = useState([])
    const [detail, setdetail] = useState({
        inpt_slno: ''
    })
    //Table
    const title = [
        {
            title: "SlNo", field: "inpt_slno",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "MRD No", field: "pt_no",
            fontWeight: 'bold',
            cellStyle: { minWidth: 5, maxWidth: 10, },
        },
        {
            title: "Reporting Time in OP", field: "dtrop_vosit_time",
            fontWeight: 'bold',
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Doctor Consultation Start", field: "consult_start_time",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Doctor Consultation End", field: "consult_end_time",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },

        {
            title: "Time Gap (Mnts)", field: "Summary",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Status", field: "Status",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Save", field: "Verify",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
    ]

    // const [open, setOpen] = useState(false);
    // const handleopenmodel = (inpt_slno) => {
    //     setgetId(inpt_slno)
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };
    // use effect for set complete or incomplete the indicator indication
    useEffect(() => {
        const getsetTablelistt = async () => {
            const result = await axioslogin.get(`/opverification/${'P001'}`)
            console.log(result)
            const { success, data, message } = result.data

            // vsd_date, doc_name,
            //     patient_opreg_time, dtrop_vosit_time,
            //     consult_start_time, consult_end_time, time_gap,
            //     remark, user_slno, op_slno, dp_code,
            //     opindicator_flag, pt_no


            if (success === 2) {
                const { op_slno, time_gap } = data[0]
                const frmdata2 = {
                    op_slno: op_slno,
                    time_gap: time_gap
                }
                setdetail(frmdata2)
                const formtable = data.map((val) => {
                    // const dkjk = 1
                    const d1 = {
                        inpt_slno: val.op_slno,
                        dtrop_vosit_time: val.dtrop_vosit_time,
                        Status: (val.opindicator_flag === 'Y') ? <FcOk size={25} /> : <FcHighPriority size={25} />,
                        pt_no: val.pt_no,
                        consult_end_time: val.consult_end_time,
                        consult_start_time: val.consult_start_time,
                        Summary: val.time_gap,
                        Verify: <IconButton
                            onClick={(e, data) => {
                                submitdata(val.op_slno)
                            }}
                        >
                            <AddTaskRoundedIcon color={(color === true) ? "error" : "primary"} />
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

    const submitdata = async (val) => {
        const postData2 = {
            op_slno: val,
            inchrgeverifictaion: 'Y'
        }
        const postData3 = {
            op_slno: val,
            inchrgeverifictaion: 'Y',
            time_gap: detail.time_gap,
            user_slno: userslno(),
            user_code_save: userid.us_code,
            dp_code: 'P001',
            create_date: '2022-03-16 10:35:31'
        }
        const result = await axioslogin.patch('/opverification/', postData2)
        const { success, message, data } = result.data
        if (success === 1) {
            const resultt = await axioslogin.post('/opverification/dpcodedetl', postData3)
            const { success, message, data } = resultt.data
            if (success === 3) {
                const resultts = await axioslogin.post('/opverification/', postData2)
                const { success, message, data } = resultts.data
                if (success === 2) {
                    const {
                        consult_end_time,
                        consult_start_time,
                        doc_name,
                        dp_code,
                        dtrop_vosit_time,
                        inchrgeverifictaion,
                        op_slno,
                        opindicator_flag,
                        patient_opreg_time,
                        pt_no,
                        ptc_slno,
                        remark,
                        time_gap,
                        user_slno,
                        vsd_date
                    } = data[0]
                    const frmdata2 = {
                        op_slno: op_slno,
                        total_patient: 1,
                        time_gap: time_gap,
                        user_slno: user_slno,
                        dp_code: dp_code,
                    }
                    const result4 = await axioslogin.post('/opverification/insert', frmdata2)
                    const { success, message } = result4.data
                    if (success === 1) {
                        succesNofity(message)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                    setcolor(!color)

                } else if (success === 0) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            } else if (success === 2) {
                const resultts = await axioslogin.post('/opverification/', postData2)
                const { success, message, data } = resultts.data
                if (success === 2) {
                    const {
                        consult_end_time,
                        consult_start_time,
                        doc_name,
                        dp_code,
                        dtrop_vosit_time,
                        inchrgeverifictaion,
                        op_slno,
                        opindicator_flag,
                        patient_opreg_time,
                        pt_no,
                        ptc_slno,
                        remark,
                        time_gap,
                        user_slno,
                        vsd_date
                    } = data[0]
                    const frmdata2 = {
                        op_slno: op_slno,
                        total_patient: 1,
                        time_gap: time_gap,
                        user_slno: user_slno,
                        dp_code: dp_code,
                    }
                    const result4 = await axioslogin.patch('/opverification/update', frmdata2)
                    const { success, message } = result4.data
                    if (success === 1) {
                        succesNofity(message)
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                    setcolor(!color)
                } else if (success === 0) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        } else if (success === 0) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }

    const history = useHistory()
    const gettablecontent = async (tableData) => {
        const { inpt_slno } = tableData
        history.push(`/Home/Outpatient`)
    }
    return (
        < Fragment >
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Verification Patient List</h5>
                </div>
                <div className="card-body">
                    {/* {open === true ? <Modelrejectop open={open} handleClose={handleClose} getid={getid} setOpen={setOpen} handleopenmodel={handleopenmodel} /> : null} */}
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

export default InchargeVerification