import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const BloodCmpTable = ({ val, setbldcomptabledata }) => {

    const setdata = () => {
        setbldcomptabledata(val.bld_slno)
    }


    return (
        <Fragment>
            < TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" colSpan={2} >{val.bld_slno}</TableCell>
                <TableCell align="center" colSpan={2}>{val.bldcomponent_name}</TableCell>
                <TableCell align="center" colSpan={2}>{val.bagreq_time}</TableCell>
                <TableCell align="center" colSpan={2}>{val.bagrec_time}</TableCell>
                <TableCell align="center" colSpan={2}>{val.noofbrdrequired}</TableCell>
                <TableCell align="center" colSpan={2}>{val.noofbagreceived}</TableCell>
                <TableCell align="center" colSpan={2}>{val.noofprdct_used}</TableCell>
                <TableCell align="center" colSpan={2}>{val.noofprdct_wasted}</TableCell>
                <TableCell align="center"><IconButton
                    onClick={setdata} >
                    <AddTaskRoundedIcon />
                </IconButton>
                </TableCell>

            </TableRow>
        </Fragment>
    )
}
export default BloodCmpTable
