import { Card, TableCell, TableBody, TableContainer, TableHead, TableRow, Icon } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { axioslogin } from '../Axios/Axios'
import { useParams } from 'react-router'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import Approvalvalue from 'src/views/Quality/Verification/Approvalvalue'
import { ToastContainer } from 'react-toastify'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const ModelapproverejectTable = ({ getid }) => {
    const { id } = useParams()

    const [indicatorData, setindicatorData] = useState()
    //for display the details of indicator with patient wise

    const [modelData, setmodelData] = useState({
        initialassNurse: '',
        initialassDoc: '',
        careplan: '',
        communicatinerr: '',
        incedence_yn: '',
        bloodcomponent_wastage: '',
        bloodcomponent_rctnoccured: '',
        dischargetimediff: '',
        ptntidntfnerror_yn: '',
        equiputlzn_timediff: '',
        sentinal_yn: ''
    })
    //Get Data
    useEffect(() => {
        const getmodeldetl = async () => {

            const result = await axioslogin.get(`/common/indicatordetl/patient/detl/${getid}`)
            const { success, data, message } = result.data;
            if (success === 1) {
                const { pt_no, inpt_slno, initalass_nurse_diff,
                    initalass_doctor_diff,
                    handover_yn, careplan_yn,
                    incedence_yn, sentinal_yn,
                    ptntidntfnerror_yn,
                    dischargetimediff,
                    bloodcomponent_wastage,
                    bloodcomponent_rctnoccured,
                    current_date,
                    bldrtranftn_flg,
                    bldwaste_flg,
                    carepln_flg,
                    commntnerror_flg,
                    distime_flg,
                    incdencfall_flg,
                    mnin_doc,
                    mnin_nurse,
                    ptidentftnerr_flg,
                    equiputlzn_timediff,
                    equipmnt_flg,
                    setintevnt_flg } = data[0]
                const frmdata = {
                    initialassNurse: initalass_nurse_diff,
                    initialassDoc: initalass_doctor_diff,
                    careplan: careplan_yn,
                    communicatinerr: handover_yn,
                    incedence_yn: incedence_yn,
                    bloodcomponent_wastage: bloodcomponent_wastage,
                    bloodcomponent_rctnoccured: bloodcomponent_rctnoccured,
                    dischargetimediff: dischargetimediff,
                    ptntidntfnerror_yn: ptntidntfnerror_yn,
                    sentinal_yn: sentinal_yn,
                    bldrtranftn_flg: bldrtranftn_flg,
                    bldwaste_flg: bldwaste_flg,
                    carepln_flg: carepln_flg,
                    commntnerror_flg: commntnerror_flg,
                    distime_flg: distime_flg,
                    incdencfall_flg: incdencfall_flg,
                    mnin_doc: mnin_doc,
                    mnin_nurse: mnin_nurse,
                    ptidentftnerr_flg: ptidentftnerr_flg,
                    equipment_utilization: equiputlzn_timediff,
                    equipmnt_flg: equipmnt_flg,
                    setintevnt_flg: setintevnt_flg
                }
                setmodelData(frmdata);
                succesNofity(message)
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getmodeldetl();
    }, []);

    function createData(name, indicators, mandatoryflag) {
        return { name, indicators, mandatoryflag };
    }
    const rows = [
        createData('Initial Assessment Nurse', modelData.initialassNurse === null ? "impending" : modelData.initialassNurse, modelData.mnin_nurse),
        createData('Initial Assessment Doctor ', modelData.initialassDoc === null ? "impending" : modelData.initialassDoc, modelData.mnin_doc),
        createData('Care plan', modelData.careplan === null ? " impending" : modelData.careplan, modelData.carepln_flg),
        createData('Communication Error', modelData.communicatinerr === null ? "impending" : modelData.communicatinerr, modelData.commntnerror_flg),
        createData('Incedence Fall', modelData.incedence_yn === null ? "impending" : modelData.incedence_yn, modelData.incdencfall_flg),
        createData('Blood Wastage', modelData.bloodcomponent_wastage === null ? "impending" : modelData.bloodcomponent_wastage, modelData.bldwaste_flg),
        createData('Reaction Occured in Blood Transfusion', modelData.bloodcomponent_rctnoccured === null ? "impending" : modelData.bloodcomponent_rctnoccured, modelData.bldrtranftn_flg),
        createData('Time Taken For Discharge', modelData.dischargetimediff === null ? "impending" : modelData.dischargetimediff, modelData.distime_flg),
        createData('Patient Idenrifiaction Error', modelData.ptntidntfnerror_yn === null ? "impending" : modelData.ptntidntfnerror_yn, modelData.ptidentftnerr_flg),
        createData('Sentinel Events', modelData.sentinal_yn === null ? "impending" : modelData.sentinal_yn, modelData.setintevnt_flg),
        createData('Equipment Utilization', modelData.equipment_utilization === null ? "impending" : modelData.equipment_utilization, modelData.equipmnt_flg),
    ];

    // const changecolor = async (e) => {
    //     e.preventDefault()

    // }

    return (
        <Fragment>
            <ToastContainer />
            <TableContainer
            // sx={{ maxHeight: 1000 }}
            >
                <Table >
                    <TableHead >
                        <TableRow>
                            {/* <TableCell align="center">Sl no</TableCell> */}
                            <TableCell component="th" scope="row" align="left" sx={{ color: 'text.primary', fontSize: 23, fontWeight: 'bold' }}>Action </TableCell>
                            <TableCell component="th" scope="row" align="center" sx={{ color: 'text.primary', fontSize: 23, fontWeight: 'bold' }}>Indicator Description</TableCell>
                            <TableCell component="th" scope="row" align="right" sx={{ color: 'text.primary', fontSize: 23, fontWeight: 'bold' }}> Indicator </TableCell>
                        </TableRow>
                    </TableHead>

                    {
                        <TableBody>
                            {
                                rows && rows.map((rows, index) => {
                                    return <Approvalvalue value={rows} key={index} datakey={index} getid={getid} />
                                }
                                )
                            }
                        </TableBody>
                    }
                </Table>
            </TableContainer>
            {/* </Card> */}
        </Fragment>
    )
}

export default memo(ModelapproverejectTable)
