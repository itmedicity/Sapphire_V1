import moment from 'moment';
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

import OutpatientTableNew from './OutpatientTableNew';
import PatientDetails from './PatientDetails';

const Outpatientmast = () => {
    const [patientList, setPatientList] = useState([{
        op_slno: 0,
        ptc_ptname: "",
        doc_name: "",
        dp_code: 0,
        vsd_date: 0,
        pt_no: 0,
        dtrop_vosit_time: 0
    }])
    // console.log(patientList)
    useEffect(() => {
        const getPatientList = async () => {
            // console.log("rini")
            const id = 'P001'
            const result = await axioslogin.get(`/op_indicator/${'P001'}`);
            // console.log(result)
            const { success, data } = result.data
            // console.log(data)
            if (success === 1) {
                const frmdata = data.map((val) => {
                    const datasave = {
                        op_slno: val.op_slno,
                        ptc_ptname: val.ptc_ptname,
                        pt_no: val.pt_no,
                        dp_code: val.dp_code,
                        doc_name: val.doc_name,
                        vsd_date: moment(val.vsd_date).format('YYYY-MM-DD HH:mm:ss'),
                        dtrop_vosit_time: val.dtrop_vosit_time === null ? '0000-00-00 00:00:00' : moment(val.dtrop_vosit_time).format('YYYY-MM-DD HH:mm:ss')

                    }
                    return datasave
                })
                // console.log(frmdata)
                const result = await axioslogin.post(`/op_indicator`, frmdata)
                const { success, message } = result.data
                if (success === 1) {
                    const result = await axioslogin.get(`/op_indicator/${'P001'}`);
                    console.log(result)
                    const { success, data } = result.data
                    if (success === 1) {

                        const frmData =
                            data.map((val) => {
                                const dataget = {
                                    op_slno: val.op_slno,
                                    ptc_ptname: val.ptc_ptname,
                                    pt_no: val.pt_no,
                                    dp_code: val.dp_code,
                                    doc_name: val.doc_name,
                                    vsd_date: moment(val.vsd_date).format('YYYY-MM-DD HH:mm:ss'),
                                    dtrop_vosit_time: val.dtrop_vosit_time === null ? '0000-00-00 00:00:00' : moment(val.dtrop_vosit_time).format('YYYY-MM-DD HH:mm:ss')
                                }
                                return dataget
                            })




                        setPatientList(frmData)
                    }
                }
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
                            console.log(value)
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



