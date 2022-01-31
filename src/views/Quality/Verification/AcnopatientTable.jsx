
import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Table } from 'react-bootstrap'
import { axioslogin } from 'src/views/Axios/Axios'
import { Card, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const AcnopatientTable = ({
    frdate
}) => {
    const { selectOutlet, updateOutlet } = useContext(PayrolMasterContext)


    const [acnoData, setacnoData] = useState({
        initialassNurse: '',
        initialassDoc: '',
        ou_code: ''

    })
    // const defaultstate = {
    //     selectOutlet: '',
    //     frdate: ''
    // }

    const postData3 = {
        ou_code: selectOutlet,
        datee: frdate
    }
    //Get Data
    useEffect(() => {
        const getmodeldetl = async () => {

            const result = await axioslogin.post(`/common/acnodetl`, postData3)
            const { success, data, message } = result.data;
            if (success === 3) {
                const { intialassessment_nurse, intialassessment_doctor, ouc_desc
                } = data[0]
                const frmdata = {
                    initialassNurse: intialassessment_nurse,
                    initialassDoc: intialassessment_doctor,
                    ou_code: ouc_desc
                }
                setacnoData(frmdata);

            } else if (success === 0) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getmodeldetl();
    }, []);

    function createData(name, indicators) {
        return { name, indicators };
    }

    const rows = [
        createData('Initial Assessment Nurse', acnoData.initialassNurse === null ? "Pending" : acnoData.initialassNurse,),
        createData('Initial Assessment Doctor ', acnoData.initialassDoc === null ? "Pending" : acnoData.initialassDoc),

    ];
    return (<Fragment>

        <div className="col-md-12">
            <TableContainer sx={{ maxHeight: 550 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow >

                            <TableCell align="left" sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'bold' }} >Indicator Description</TableCell>
                            <TableCell align="left" sx={{ color: 'text.primary', fontSize: 20, fontWeight: 'bold' }} > Indicator </TableCell>
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

    </Fragment>)

};

export default AcnopatientTable;

