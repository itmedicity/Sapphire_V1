import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const CareplanTble = ({ val, setCareplndata }) => {
    const setdata = () => {
        setCareplndata(val.nc_slno)
    }
    return (
        <Fragment>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell align="center" >{val.nc_slno}</TableCell>
                <TableCell align="center">{val.nc_currentdate}</TableCell>
                <TableCell align="center">{val.nc_ysno}</TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={setdata} >
                        <AddTaskRoundedIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default CareplanTble