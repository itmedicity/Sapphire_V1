import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment';
import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import BloodCmpTable from './Component/BloodCmpTable';


const BloodcomponentTable = ({ settabledata, tabledata, setbldcomptabledata }) => {
    const { id } = useParams()
    //  for getting values into the table
    useEffect(() => {
        const bloodcomponentsum = async () => {
            const result = await axioslogin.get(`bloodcomponents/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { bld_slno, bagreq_time, bagrec_time, bagrequested, bagreceived, bldprduct_used, bldprduct_wasted,
                    reactn_occ, remark, bldcomponent_name, bldmast_name } = data
                const formtable = data.map((val) => {
                    const d1 = {
                        bld_slno: val.bld_slno,
                        bagreq_time: moment(val.bagreq_time).format("YYYY-MM-DD HH:mm:ss"),
                        bagrec_time: moment(val.bagrec_time).format("YYYY-MM-DD HH:mm:ss"),
                        noofbrdrequired: val.bagrequested,
                        noofbagreceived: val.bagreceived,
                        noofprdct_used: val.bldprduct_used,
                        noofprdct_wasted: val.bldprduct_wasted,
                        reactn_occ: val.reactn_occ,
                        remark: val.remark,
                        bldcomponent_name: val.bldcomponent_name,
                        bldmast_name: val.bldmast_name,
                    }
                    return d1
                })
                settabledata(formtable)
            }
        }
        bloodcomponentsum()
    }, [id])
    return (
        <Fragment>
            <Card className="card-body">
                <div className="col-md-12">
                    <TableContainer sx={{ maxHeight: 150 }}>
                        <Table size="small"
                            icons={tableIcons}
                            stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Sl no</TableCell>
                                    <TableCell align="center">Requested Date</TableCell>
                                    <TableCell align="center">Received  Date</TableCell>
                                    <TableCell align="center">Requested Bags</TableCell>
                                    <TableCell align="center">Received Bags</TableCell>
                                    <TableCell align="center">Used Bags</TableCell>
                                    <TableCell align="center">Wasted Bags</TableCell>
                                    <TableCell align="center">Reaction Occured</TableCell>
                                    <TableCell align="center">Group</TableCell>
                                    <TableCell align="center">Component</TableCell>
                                    <TableCell align="center">Remarks</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tabledata.map((val, index) => {
                                        return <BloodCmpTable val={val} key={index} setbldcomptabledata={setbldcomptabledata} />
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
export default BloodcomponentTable
