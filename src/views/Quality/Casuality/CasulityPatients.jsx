import MaterialTable from 'material-table'
import { useEffect } from 'react';
import { useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import React, { Fragment } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { useHistory } from 'react-router-dom'
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const CasulityPatients = ({ update }) => {
    const [tableData, setTableData] = useState([]);

    const title = [
        {
            title: 'Sl_no', field: 'inpt_slno', cellStyle: { minWidth: 5, maxWidth: 7 }
        },
        {
            title: 'Date', field: 'ipd_date', cellStyle: { minWidth: 250, maxWidth: 250 }
        },
        {
            title: 'MRD No', field: 'pt_no', cellStyle: { minWidth: 150, maxWidth: 170 }
        },
        {
            title: 'Patient Name', field: 'ptc_ptname', cellStyle: { minWidth: 230, maxWidth: 300 }
        },
        {
            title: 'Gender', field: 'ptc_sex', cellStyle: { minWidth: 100, maxWidth: 150 }
        },
        {
            title: 'Room', field: 'bdc_no', cellStyle: { minWidth: 120, maxWidth: 150 }
        },
        {
            title: 'Doctor', field: 'doc_name', cellStyle: { minWidth: 300, maxWidth: 300 }
        },
        {
            title: 'Specilaity', field: 'spc_desc', cellStyle: { minWidth: 250, maxWidth: 300 }
        },
        {
            title: 'Status', field: 'inpt_flag', cellStyle: { minWidth: 192, maxWidth: 200 }
        }
    ]
    useEffect(() => {
        const getsetTablelist = async () => {
            const result = await axioslogin.get(`/inpatientlist/${4002}`)
            const { success, data, message } = result.data;
            if (success === 2) {
                setTableData(data);
            } else {
                infoNofity(message);
            }
        }
        getsetTablelist();
    }, [update]);

    const history = useHistory()
    const getablelist = async (data) => {
        const { inpt_slno } = data
        history.push(`/Home/CasualityEdit/${inpt_slno}`)
    }

    return (
        <Fragment>
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Casulity Patients List</h5>
                </div>
                <div className="card-body">
                    <MaterialTable
                        title="Patient List"
                        data={tableData}
                        columns={title}
                        icons={tableIcons}
                        actions={[
                            {
                                icon: () => <EditOutlinedIcon />,
                                tooltip: "Click here to Edit",
                                onClick: (e, data) => getablelist(data)
                            }
                        ]}
                        options={{
                            paginationType: "stepped",
                            showFirstLastPageButtons: false,
                            padding: "dense",
                            actionsColumnIndex: 0
                        }}
                    />
                </div>
            </div>
        </Fragment>
    )
}
export default CasulityPatients
