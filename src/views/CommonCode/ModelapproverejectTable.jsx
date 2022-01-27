import { Card, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { axioslogin } from '../Axios/Axios'
import { warningNofity } from './Commonfunc';
import { useParams } from 'react-router'

const ModelapproverejectTable = ({ getid }) => {
    const { id } = useParams()

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
        sentinal_yn: ''
    })
    //Get Data
    useEffect(() => {
        const getmodeldetl = async () => {

            const result = await axioslogin.get(`/common/indicatordetl/patient/detl/${getid}`)
            const { success, data } = result.data;
            if (success === 1) {
                const { pt_no, inpt_slno, initalass_nurse_diff, initalass_doctor_diff, handover_yn, careplan_yn, incedence_yn, sentinal_yn, ptntidntfnerror_yn, dischargetimediff,
                    bloodcomponent_wastage, bloodcomponent_rctnoccured, current_date } = data[0]
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
                    sentinal_yn: sentinal_yn
                }
                setmodelData(frmdata);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getmodeldetl();
    }, []);

    function createData(name, indicators) {
        return { name, indicators };
    }
    const rows = [
        createData('Initial Assessment Nurse', modelData.initialassNurse === null ? "Pending" : modelData.initialassNurse,),
        createData('Initial Assessment Doctor ', modelData.initialassDoc === null ? "Pending" : modelData.initialassDoc),
        createData('Care plan', modelData.careplan === null ? " Pending" : modelData.careplan),
        createData('Communication Error', modelData.communicatinerr === null ? "Pending" : modelData.communicatinerr),
        createData('Incedence Fall', modelData.incedence_yn === null ? "Pending" : modelData.incedence_yn),
        createData('Blood Wastage', modelData.bloodcomponent_wastage === null ? "Pending" : modelData.bloodcomponent_wastage),
        createData('Reaction Occured in Blood Transfusion', modelData.bloodcomponent_rctnoccured === null ? "Pending" : modelData.bloodcomponent_rctnoccured),
        createData('Time Taken For Discharge', modelData.dischargetimediff === null ? "Pending" : modelData.dischargetimediff),
        createData('Patient Idenrifiaction Error', modelData.ptntidntfnerror_yn === null ? "Pending" : modelData.ptntidntfnerror_yn),
        createData('Sentinel Events', modelData.sentinal_yn === null ? "Pending" : modelData.sentinal_yn),
    ];
    return (
        <Fragment>
            {/* <Card> */}
            <div className="col-md-12">
                <TableContainer sx={{ maxHeight: 550 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow >
                                {/* <TableCell align="center">Sl no</TableCell> */}
                                <TableCell align="left" sx={{ color: 'text.primary', fontSize: 23, fontWeight: 'bold' }}>Indicator Description</TableCell>
                                <TableCell align="left" sx={{ color: 'text.primary', fontSize: 23, fontWeight: 'bold' }}> Indicator </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    align="center"
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.indicators}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* </Card> */}

        </Fragment>
    )
}

export default memo(ModelapproverejectTable)
