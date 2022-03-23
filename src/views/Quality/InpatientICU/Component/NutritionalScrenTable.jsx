import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const NutritionalScrenTable = ({ val, setnutriscreendatae }) => {
    const setdata = () => {
        setnutriscreendatae(val.nutscreen_slno)
    }
    return (
        <Fragment>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell align="center" >{val.nutscreen_slno}</TableCell>
                <TableCell align="center">{val.ns_currentdate}</TableCell>
                <TableCell align="center">{val.ns_ysno}</TableCell>
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

export default NutritionalScrenTable