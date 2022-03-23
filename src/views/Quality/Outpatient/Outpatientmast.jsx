import moment from 'moment';
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity } from 'src/views/CommonCode/Commonfunc';

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
    const [opdata, setopdata] = useState(
        [
            {
                op_slno: '',
                ptc_ptname: '',
                pt_no: '',
                dp_code: '',
                doc_name: '',
                vsd_date: '',
                dtrop_vosit_time: ''
            }
        ]
    )
    useEffect(() => {
        const getPatientList = async () => {
            const result1 = await axioslogin.get(`/op_indicator/${'P001'}`)
            const { success, data } = result1.data
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
                    //filtering the data from the data base and inserting dates and finding the new array to insert
                })

                const result = await axioslogin.get(`/op_indicator/getdetl/${'P001'}`);
                // const { success, data } = result.data
                if (result.data.success === 2) {
                    const frmdataa = result.data.data.map((val) => {
                        const datasaves = {
                            consult_end_time: moment(val.consult_end_time).format('YYYY-MM-DD HH:mm:ss'),
                            consult_start_time: moment(val.consult_start_time).format('YYYY-MM-DD HH:mm:ss'),
                            doc_name: val.doc_name,
                            dp_code: val.dp_code,
                            dtrop_vosit_time: val.dtrop_vosit_time,
                            op_slno: val.op_slno,
                            opindicator_flag: val.opindicator_flag,
                            patient_opreg_time: val.patient_opreg_time,
                            pt_no: val.pt_no,
                            ptc_slno: val.ptc_slno,
                            remark: val.remark,
                            time_gap: val.time_gap,
                            user_slno: val.user_slno,
                            vsd_date: moment(val.vsd_date).format('YYYY-MM-DD HH:mm:ss')
                        }
                        return datasaves
                    })
                    setopdata(frmdataa)
                    const newdatasave = frmdata.filter((val) => {
                        return frmdataa.filter((data1) => {

                            return val.op_slno === data1.op_slno
                        }).length === 0
                    })
                    if (newdatasave.length === 0) {

                        const result = await axioslogin.get(`/op_indicator/${'P001'}`);

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
                    else {
                        const result = await axioslogin.post(`/op_indicator`, newdatasave)
                        const { success } = result.data
                        if (success === 1) {
                            const result = await axioslogin.get(`/op_indicator/${'P001'}`);

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

                } else if (result.data.success === 0) {
                    const result = await axioslogin.post(`/op_indicator`, frmdata)
                    const { success } = result.data
                    if (success === 1) {
                        const result = await axioslogin.get(`/op_indicator/${'P001'}`);

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

                            return <PatientDetails id={value.op_slno} value={value} key={index} />
                        })

                    }
                    {/* </OutpatientTableNew> */}
                </div>
            </div>
        </Fragment>
    )
}
export default memo(Outpatientmast)



