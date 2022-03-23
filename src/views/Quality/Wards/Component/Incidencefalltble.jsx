import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const Incidencefalltble = ({ val, setincedecedata }) => {
    const setdata = () => {
        setincedecedata(val.if_slno)
    }
    return (
        <Fragment>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell align="center" >{val.if_slno}</TableCell>
                <TableCell align="center">{val.if_currentdate}</TableCell>
                <TableCell align="center">{val.if_ysno}</TableCell>
                {/* <TableCell align="center" >{val.pie_no} </TableCell> */}
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

export default Incidencefalltble