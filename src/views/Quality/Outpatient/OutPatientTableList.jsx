
import React, { Fragment, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import MaterialTable from 'material-table';
import Nameavatar from 'src/views/CommonCode/Nameavatar';
import Datetimepicker from 'src/views/CommonCode/Datetimepicker';


const OutPatientTableList = () => {
    const [tableData, setTableData] = useState([])
    const title = [
        {
            title: '#', field: 'ptc_slno', editable: 'never', cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: 'Patient Name', field: 'ptc_ptname', editable: 'never', cellStyle: { minWidth: 200, maxWidth: 250 }, render: (row) => <Nameavatar row={row.ptc_ptname} />
        },
        {
            title: 'Doctor', field: 'doc_name', editable: 'never', cellStyle: { minWidth: 250, maxWidth: 300 }
        },
        {
            title: 'Patient Reported Time OPD ', field: 'PATIENT_OPREG_TIME', cellStyle: { minWidth: 250, maxWidth: 300 },
            render: (row) => <Datetimepicker row={row.PATIENT_OPREG_TIME} />
        },
        {
            title: 'Consultation start Time', field: 'consult_start_time', cellStyle: { minWidth: 250, maxWidth: 300 }, render: (row) => <Datetimepicker row={row.consult_start_time} />
        },
        {
            title: 'Consultation End Time', field: 'consult_end_time', cellStyle: { minWidth: 250, maxWidth: 300 }, render: (row) => <Datetimepicker row={row.consult_end_time} />
        },
        {
            title: 'Remark', field: 'REMARK', editable: 'never', cellStyle: { minWidth: 150, maxWidth: 250 }
        },
    ]
    useEffect(() => {
        const getInpatientList = async () => {
            const result = await axioslogin.get(`/op_indicator/${'P001'}`);
            const { success, data } = result.data;
            if (success === 2) {
                setTableData(data);
            }
        }
        getInpatientList();
    }, []);
    return (
        <Fragment>
            <MaterialTable
                title="Patient List"
                data={tableData}
                columns={title}
                icons={tableIcons}
                options={{

                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0

                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...tableData];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setTableData([...dataUpdate]);
                                resolve();
                            }, 1000)
                        })
                }}
            />
        </Fragment >
    )
}
export default memo(OutPatientTableList)
