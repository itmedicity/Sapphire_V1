import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { Fragment, useState } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const BloodCmpTable = ({ val, setbldcomptabledata }) => {

    const [state, setstate] = useState(0)
    const setdata = () => {
        setbldcomptabledata(val.bld_slno)
    }
    return (
        <Fragment>
            < TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell style={{ width: '30%' }} align="center" >{val.bld_slno}</TableCell>
                <TableCell style={{ width: '1000%' }} align="center">{val.bagreq_time}</TableCell>
                <TableCell style={{ width: '1000%' }} align="center">{val.bagrec_time}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.noofbrdrequired}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.noofbagreceived}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.noofprdct_used}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.noofprdct_wasted}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.reactn_occ}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.bldmast_name}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.bldcomponent_name}</TableCell>
                <TableCell style={{ width: '50%' }} align="center">{val.remark}</TableCell>
                <TableCell style={{ width: '50%' }} align="center"><IconButton
                    onClick={setdata} >
                    <AddTaskRoundedIcon />
                </IconButton>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}
export default BloodCmpTable
