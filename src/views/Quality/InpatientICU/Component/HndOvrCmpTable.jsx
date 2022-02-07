import { TableCell, TableRow } from '@mui/material'
import React, { Fragment } from 'react'
// import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const HndOvrCmpTable = ({ val, sethandovrcmtntableData }) => {
    const setdata = () => {
        sethandovrcmtntableData(val.ce_slno)
    }
    return (
        <Fragment>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell align="center" >{val.ce_slno}</TableCell>
                <TableCell align="center">{val.ce_currdate}</TableCell>
                <TableCell align="center">{val.ce_ysno}</TableCell>
                <TableCell align="center">{val.ce_shiftdetails}</TableCell>
                {/* <TableCell align="center">
                    <IconButton
                        onClick={setdata} >
                        <AddTaskRoundedIcon />
                    </IconButton>
                </TableCell> */}
            </TableRow>
        </Fragment>
    )
}

export default HndOvrCmpTable
