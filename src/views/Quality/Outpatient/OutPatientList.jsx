import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

import PatientDetails from './PatientDetails'

const OutPatientList = () => {
    const [patientList, setPatientList] = useState([])
    useEffect(() => {
        const getPatientList = async () => {
            const result = await axioslogin.get(`/op_indicator/${'P001'}`);
            const { success, data } = result.data
            if (success === 1) {
                setPatientList(data)
                succesNofity(message)


            } else if (success === 2) {
                warningNofity(message)
            } else {
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

                </div>
            </div>
        </Fragment>
    )
}

export default OutPatientList
