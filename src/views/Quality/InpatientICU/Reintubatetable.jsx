import MaterialTable from 'material-table';
import React, { Fragment, memo, useState } from 'react';
import { useHistory } from 'react-router';

const Reintubatetable = () => {
    const [data, setTableData] = useState();
    const history = useHistory();
    const title = [
        {
            title: "Sl No", field: "ip_reintubation_slno"
        },
        {
            title: "Intubated Time", field: "intubated_date"
        },
        {
            title: "Extubated Time", field: "extubated_date"
        },
    ]

    // useEffect(() => {
    //     const getDesigList = async () => {
    //         const result = await axioslogin.get('/designation')
    //         const { success, data } = result.data;
    //         if (success === 1) {
    //             setTableData(data);
    //         } else {
    //             warningNofity(" Error occured contact EDP")
    //         }
    //     }
    //     getDesigList();

    // }, [update]);

    //For Editing
    // const getDataTable = (data) => {
    //     const { desg_slno } = data
    //     history.push(`/Home/DesignationMastTableEdit/${desg_slno}`)
    // }
    return (
        <Fragment>
            <MaterialTable
                // title="Designation"
                // data={data}
                // columns={title}
                // icons={tableIcons}
                actions={[
                    // {
                    //     icon: () => <EditOutlinedIcon />,
                    //     tooltip: "Click here to Edit",
                    //     // onClick: (e, data) => getDataTable(data)
                    // }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0
                }}

            />
        </Fragment>
    )
}

export default memo(Reintubatetable)
