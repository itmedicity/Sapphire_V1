import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import NearmisTable from './Component/NearmisTable'

const NearmissesTable = ({ tabledata, settableData, setnearmissesdata }) => {
    const { id } = useParams()
    useEffect(() => {
        const nearmisseplan = async () => {
            const result = await axioslogin.get(`nearMisses/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                // const { ce_slno, ce_currdate, ce_ysno, ce_shiftdetails } = data
                const formtable = data.map((val) => {
                    const d1 = {
                        nm_slno: val.nm_slno,
                        nm_currentdate: moment(val.nm_currentdate).format("YYYY-MM-DD HH:mm:ss"),
                        nm_ysno: val.pie_ysno,
                    }
                    return d1
                })
                settableData(formtable)
            }
        }
        nearmisseplan()
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
                                    <TableCell align="center" >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tabledata.map((val, index) => {
                                        return <NearmisTable val={val} key={index} setnearmissesdata={setnearmissesdata} />
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

export default NearmissesTable