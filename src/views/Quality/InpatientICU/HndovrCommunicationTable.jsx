import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import HndOvrCmpTable from './Component/HndOvrCmpTable'
import { tableIcons } from 'src/views/Constant/MaterialIcon';

const HndovrCommunicationTable = ({ tabledata, settableData, sethandovrcmtntableData }) => {
    const { id } = useParams()

    // for getting values into the table 
    useEffect(() => {
        const hndovrcmtndetails = async () => {
            const result = await axioslogin.get(`communicationerror/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                // const { ce_slno, ce_currdate, ce_ysno, ce_shiftdetails } = data
                const formtable = data.map((val) => {
                    const d1 = {
                        ce_slno: val.ce_slno,
                        ce_currdate: moment(val.ce_currdate).format("YYYY-MM-DD HH:mm:ss"),
                        ce_ysno: val.ce_ysno,
                        ce_shiftdetails: val.ce_shiftdetails,

                    }
                    return d1
                })
                settableData(formtable)
            }
        }
        hndovrcmtndetails()
    }, [id])
    return (
        <Fragment>
            <Card>
                <div className="col-md-12">
                    <TableContainer sx={{ maxHeight: 150 }}>
                        <Table size="small"
                            icons={tableIcons}
                            stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Sl no</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">HandOver Done</TableCell>
                                    <TableCell align="center">Shift Details</TableCell>
                                    <TableCell align="center" >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tabledata.map((val, index) => {
                                        return <HndOvrCmpTable val={val} key={index} sethandovrcmtntableData={sethandovrcmtntableData} />
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </Card>

        </Fragment>
    )
}

export default HndovrCommunicationTable
