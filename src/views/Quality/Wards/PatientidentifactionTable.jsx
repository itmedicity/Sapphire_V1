import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import PatntidneterrorTable from './Component/PatntidneterrorTable'

const PatientidentifactionTable = ({ tabledata, settableData, setpatenterrorData }) => {
    const { id } = useParams()

    useEffect(() => {
        const patineterredata = async () => {

            const result = await axioslogin.get(`patientIdenticationError/${id}`)

            const { success, data } = result.data

            if (success === 1) {
                // const { ce_slno, ce_currdate, ce_ysno, ce_shiftdetails } = data
                const formtable = data.map((val) => {
                    const d1 = {
                        pie_slno: val.pie_slno,
                        pie_currentdate: moment(val.pie_currentdate).format("YYYY-MM-DD HH:mm:ss"),
                        pie_ysno: val.pie_ysno,
                    }
                    return d1
                })
                settableData(formtable)
            }
        }
        patineterredata()
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
                                        return <PatntidneterrorTable val={val} key={index} setpatenterrorData={setpatenterrorData} />
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

export default PatientidentifactionTable