import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment';
import React, { Fragment, useEffect } from 'react'
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
                // const { bld_slno, bagreq_time, bagrec_time, bagrequested, bagreceived, bldprduct_used, bldprduct_wasted,
                //     reactn_occ, remark, bldcomponent_name, bldmast_name } = data
                const formtable = data.map((val) => {
                    const d1 = {
                        bld_slno: val.bld_slno,
                        bagreq_time: moment(val.bagreq_time).format("YYYY-MM-DD HH:mm:ss"),
                        bagrec_time: moment(val.bagrec_time).format("YYYY-MM-DD HH:mm:ss"),
                        noofbrdrequired: val.bagrequested,
                        noofbagreceived: val.bagreceived,
                        noofprdct_used: val.bldprduct_used,
                        noofprdct_wasted: val.bldprduct_wasted,
                        bldcomponent_name: val.bldcomponent_name
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
                                    <TableCell align="center" colSpan={2}>No</TableCell>
                                    <TableCell align="center" colSpan={2}>Component</TableCell>
                                    <TableCell align="center" colSpan={2}>Requested</TableCell>
                                    <TableCell align="center" colSpan={2}>Received  </TableCell>
                                    <TableCell align="center" colSpan={2}>Requested Bags</TableCell>
                                    <TableCell align="center" colSpan={2}>Received Bags</TableCell>
                                    <TableCell align="center" colSpan={2}>Used Bags</TableCell>
                                    <TableCell align="center" colSpan={2}>Wasted Bags</TableCell>
                                    <TableCell align="center" >Action</TableCell>
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
