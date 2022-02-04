
import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Table } from 'react-bootstrap'
import { axioslogin } from 'src/views/Axios/Axios'
import { Card, TableCell, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Qualityverifitable = () => {
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

                    {/* <TableBody>
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
                    </TableBody> */}
                </Table>
            </TableContainer>
        </div>

    </Fragment>)
};

export default Qualityverifitable;
