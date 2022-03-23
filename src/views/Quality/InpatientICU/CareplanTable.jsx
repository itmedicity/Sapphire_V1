import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import CareplanTble from './Component/CareplanTble'

const CareplanTable = ({ tabledata, settableData, setCareplndata }) => {
    const { id } = useParams()
    useEffect(() => {
        const caredataplan = async () => {

            const result = await axioslogin.get(`careplan/${id}`)

            const { success, data } = result.data

            if (success === 1) {
                // const { ce_slno, ce_currdate, ce_ysno, ce_shiftdetails } = data
                const formtable = data.map((val) => {
                    const d1 = {
                        nc_slno: val.nc_slno,
                        nc_currentdate: moment(val.nc_currentdate).format("YYYY-MM-DD HH:mm:ss"),
                        nc_ysno: val.nc_ysno,
                    }
                    return d1
                })
                settableData(formtable)
            }
        }
        caredataplan()
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
                                        return <CareplanTble val={val} key={index} setCareplndata={setCareplndata} />
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

export default CareplanTable