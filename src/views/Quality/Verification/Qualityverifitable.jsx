
import React, { Fragment, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap'
import { axioslogin } from 'src/views/Axios/Axios'
import { TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { ToastContainer } from 'react-toastify'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Qualityverifitable = ({ frdate, setacnoData, acnoData
}) => {
    const { selectOutlet, updateOutlet } = useContext(PayrolMasterContext)

    const postData3 = {
        ou_code: selectOutlet,
        datee: frdate
    }
    //Get Data
    useEffect(() => {
        const getmodeldetl = async () => {
            const result = await axioslogin.post(`/common/acnodetl`, postData3)
            console.log(result)
            const { success, data, message } = result.data;
            if (success === 3) {
                const { intialassessment_nurse, intialassessment_doctor, dicharge,
                    bc_blood_wastage, bc_bloodtransreactn_ys,
                    carepln_ys, hndcomm_ys, incidence_ys,
                    ou_code
                } = data[0]
                const frmdata = {
                    initialassNurse: intialassessment_nurse,
                    initialassDoc: intialassessment_doctor,
                    dicharge: dicharge,
                    bc_blood_wastage: bc_blood_wastage,
                    bc_bloodtransreactn_ys: bc_bloodtransreactn_ys,
                    carepln_ys: carepln_ys,
                    hndcomm_ys: hndcomm_ys,
                    incidence_ys: incidence_ys,
                    ou_code: ou_code
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












    function createData(name, indicators, status) {
        return { name, indicators, status };
    }

    const rows = [
        createData('Initial Assessment Nurse', acnoData.initialassNurse === null ? "Pending" : acnoData.initialassNurse,),
        createData('Initial Assessment Doctor ', acnoData.initialassDoc === null ? "Pending" : acnoData.initialassDoc),
        createData('Care Plan Documented ', acnoData.carepln_ys === null ? "Pending" : acnoData.carepln_ys),
        createData('Discharge Timetaken ', acnoData.dicharge === null ? "Pending" : acnoData.dicharge),
        createData('Blood Component Wasted ', acnoData.bc_blood_wastage === null ? "Pending" : acnoData.bc_blood_wastage),
        createData('Blood Transfusion reaction Ocuured ', acnoData.bc_bloodtransreactn_ys === null ? "Pending" : acnoData.bc_bloodtransreactn_ys),
        createData('Hand Over Communication Error', acnoData.hndcomm_ys === null ? "Pending" : acnoData.hndcomm_ys),
        createData('Incednce Fall', acnoData.incidence_ys === null ? "Pending" : acnoData.incidence_ys),


    ];
    return (
        <Fragment>
            <ToastContainer />
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
                                    <TableCell align="left">{row.status}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </Fragment>)
};

export default Qualityverifitable;
