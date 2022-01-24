import { Card, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { axioslogin } from '../Axios/Axios'
import { warningNofity } from './Commonfunc';

const ModelapproverejectTable = ({ getid }) => {


    const [modelData, setmodelData] = useState({
        initialassNurse: '',
        initialassDoc: '',
        careplan: '',
        communicatinerr: '',
        incedence_yn: '',
    })



    //Get Data
    useEffect(() => {
        const getmodeldetl = async () => {

            const result = await axioslogin.get(`/common/indicatordetl/patient/${getid}`)

            const { success, data } = result.data;

            if (success === 1) {
                const { pt_no, inpt_slno, initalass_nurse_diff, initalass_doctor_diff, handover_yn, careplan_yn, incedence_yn, current_date } = data[0]
                //console.log(initalass_nurse_diff)
                const frmdata = {
                    initialassNurse: initalass_nurse_diff,
                    initialassDoc: initalass_doctor_diff,
                    careplan: careplan_yn,
                    communicatinerr: handover_yn,
                    incedence_yn: incedence_yn
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
        createData('Incedence Fall', modelData.incedence_yn === null ? "Pending" : modelData.incedence_yn)
    ];



    return (
        <Fragment>
            {/* <Card> */}
            <div className="col-md-12">
                <TableContainer sx={{ maxHeight: 250 }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow >
                                {/* <TableCell align="center">Sl no</TableCell> */}
                                <TableCell align="left" sx={{ color: 'text.primary', fontSize: 21, fontWeight: 'bold' }}>Indicator Description</TableCell>
                                <TableCell align="left" sx={{ color: 'text.primary', fontSize: 21, fontWeight: 'bold' }}> Indicator </TableCell>
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
