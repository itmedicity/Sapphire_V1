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

const AcnotableVerify = ({ update, frdate, Setmonthval }) => {
    const [tableData, setTableDataa] = useState([])
    const [userid, setuserid] = useState({
        us_code: ''
    })

    const postData3 = {
        create_date: frdate
    }

    // const [search, setSearch] = useState(false)s
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
            title: "Result", field: "result",
            fontWeight: 'bold',
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Sum of Time", field: "time_gap",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },
        {
            title: "Total no.of Patient", field: "tot_patient",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },

        {
            title: "Status", field: "Verify",
            cellStyle: { minWidth: 5, maxWidth: 10 },
        },

    ]

    useEffect(() => {

        const getverifictiondetl = async () => {
            const results = await axioslogin.post(`/opverification/getdteails/`, postData3)
            const { success, data, message } = results.data

            if (success === 2) {
                // const { tot_patient, time_gap } = data[0]
                // const frm = {
                //     tot_patient: tot_patient,
                //     time_gap: time_gap
                // }
                const formtable = data.map((val) => {
                    const diff = (val.time_gap / val.tot_patient).toFixed(4)
                    // const dkjk = 1
                    const d1 = {
                        dpc_desc: val.dpc_desc,
                        result: diff,
                        tot_patient: val.tot_patient,
                        time_gap: val.time_gap,
                        Verify: <IconButton
                            onClick={(e, data) => {
                                submitdata(val.dp_code, diff)
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
                setTableDataa([])
            }
        }
        getverifictiondetl()
    }, [update])
    const submitdata = async (dp_code, diff) => {
        const frmdatas = {
            dp_code: dp_code,
            result_time: diff,
            acnoverify_flag: 'y',
            user_slno: userslno(),
        }
        const resultts = await axioslogin.post('/opcnoverify/', frmdatas)
        const { success, message } = resultts.data
        if (success === 1) {
            succesNofity(message)
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

                <MaterialTable
                    title="Acno Verifictaion "
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
            </div>
            {/* </div > */}
        </Fragment >

    )
}

export default AcnotableVerify