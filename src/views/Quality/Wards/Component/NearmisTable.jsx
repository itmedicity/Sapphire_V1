import React, { Fragment } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { IconButton, TableCell, TableRow } from '@mui/material'
const NearmisTable = ({ val, setnearmissesdata }) => {

    const setdata = () => {
        setnearmissesdata(val.nm_slno)
    }
    return (
        <Fragment>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell align="center" >{val.nm_slno}</TableCell>
                <TableCell align="center">{val.nm_currentdate}</TableCell>
                <TableCell align="center">{val.nm_ysno}</TableCell>
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

export default NearmisTable