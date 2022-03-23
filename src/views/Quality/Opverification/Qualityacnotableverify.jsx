import React, { Fragment, useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { MdCheckCircle } from "react-icons/md"
import { FcOk, FcHighPriority } from "react-icons/fc";
import { useHistory } from 'react-router';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { ToastContainer } from 'react-toastify'
import { userslno } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import {
    IconButton
} from '@mui/material'

const Qualityacnotableverify = ({ update, frdate, setSearch, monthval, Setmonthval }) => {
    const [tableData, setTableDataa] = useState([])
    const [userid, setuserid] = useState({
        us_code: ''
    })
    const postdata3 = {
        create_date: frdate,
        acnoveri_date: frdate
    }

    const title = [
        // {
        //     title: "SlNo", field: "inpt_slno",
        //     cellStyle: { minWidth: 5, maxWidth: 10 },
        // },
        {
            title: "Department", field: "dpc_desc",
            fontWeight: 'bold',
            cellStyle: { minWidth: 5, maxWidth: 10, },
        },
        {
            title: "Total Patient", field: "total_patient",
            fontWeight: 'bold',
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Sum of Time", field: "time_gap",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Avg Waiting Time", field: "result_time",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },

        {
            title: "Status", field: "Verify",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
    ]
    useEffect(() => {

        const getqualityvefiydetl = async () => {
            const results = await axioslogin.post(`/opcnoverify/datas`, postdata3)
            const { success, data, message } = results.data
            if (success === 2) {
                const formtable = data.map((val) => {
                    const d1 = {
                        dpc_desc: val.dpc_desc,
                        result_time: parseFloat(val.result_time).toFixed(4),
                        time_gap: val.time_gap,
                        total_patient: val.total_patient,
                        Verify: <IconButton
                            onClick={(e, data) => {
                                submitdata(val.dp_code, val.dpc_desc, val.result_time, val.time_gap, val.total_patient)
                            }}
                        >
                            <AddTaskRoundedIcon color='success' />
                        </IconButton>
                    }
                    return d1
                })
                setTableDataa(formtable)
                Setmonthval(formtable)
            }
            else if (success === 0) {
                const d2 = {
                    dpc_desc: '',
                    result_time: '',
                    time_gap: '',
                    total_patient: '',
                    Verify: ''

                }
                setTableDataa([])
            }
        }
        getqualityvefiydetl()
    }, [update, frdate])
    const submitdata = async (dp_code, dpc_desc, result_time, time_gap, total_patient) => {
        const frmdatatd = {
            dpc_desc: dpc_desc,
            avg_opdwtime: result_time,
            sumopd_wattime: time_gap,
            opdpt_count: total_patient,
            dp_code: dp_code,
            user_slno: userslno(),
            quality_flg: 'Y'
        }
        const frmdatas = {
            dp_code: dp_code
        }

        const resultts = await axioslogin.patch('/opcnoverify/update', frmdatas)
        const { success, message } = resultts.data
        if (success === 1) {
            const result2 = await axioslogin.post('/opcnoverify/qualitydata', frmdatatd)
            if (success === 1) {
                succesNofity(message)
            } else if (success === 0) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        } else if (success === 0) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }
    return (
        < Fragment >
            <ToastContainer />
            <div className="card">

                {/* <div className="card-body"> */}
                <MaterialTable
                    title="Quality Verification"
                    data={tableData}
                    columns={title}
                    icons={tableIcons}
                    selection={true}
                    // actions={[
                    //     {
                    //         icon: () =>
                    //             <EditOutlinedIcon />,
                    //         tooltip: 'Click to edit',
                    //         // onClick: (e, tableData) => gettablecontent(tableData),
                    //         position: "row"
                    //     },
                    // ]}
                    options={{
                        // paginationType: "stepped",
                        // showFirstLastPageButtons: false,
                        padding: "dense",
                        // actionsColumnIndex: -1,
                        // exportButton: true,
                        rowStyle: {
                            backgroundColor: '#EEE',
                        },
                        headerStyle: {
                            backgroundColor: '#819299',
                            color: '#FFF'
                        }
                    }}
                />
                {/* </div> */}
            </div >
        </Fragment >
    )
}

export default Qualityacnotableverify