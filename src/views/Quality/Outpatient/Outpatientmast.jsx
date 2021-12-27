import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import OutPatientTableList from './OutPatientTableList';
import OutpatientTableNew from './OutpatientTableNew';
import PatientDetails from './PatientDetails';

const Outpatientmast = () => {
    const [patientList, setPatientList] = useState([])
    useEffect(() => {
        const getPatientList = async () => {
            const id = 'P001'
            const result = await axioslogin.post(`/op_indicator`);
            const { success, data } = result.data
            if (success === 2) {
                setPatientList(data)
            }
            else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getPatientList()
    }, [])
    //use Memo
    const patientLists = useMemo(() => patientList, [patientList])

    return (
        <Fragment>
            <div className="row g-1">
                <div className="col-md-12">
                    <OutpatientTableNew />
                    {
                        patientLists.map((value, index) => {
                            return <PatientDetails value={value} key={index} />
                        })

                    }
                    {/* </OutpatientTableNew> */}
                </div>
            </div>
        </Fragment>
    )
}
export default memo(Outpatientmast)



