import { Card, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { Fragment, useState } from 'react'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { green } from '@mui/material/colors';
import { FaBold } from 'react-icons/fa';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const Approvalvalue = ({ value, datakey, getid }, key) => {
    const { name, indicators, mandatoryflag } = value
    const [color, setcolor] = useState(true)
    const changecolor = async (e) => {
        e.preventDefault()
        const postData2 = {
            values: value,
            datakeys: datakey,
            id: getid
        }
        if (indicators === 'impending') {
            const result4 = await axioslogin.patch('/manadtory', postData2)
            const { success, message } = result4.data
            if (success === 2) {
                succesNofity(message)
            } else if (success === 0) {
                warningNofity(message)
            } else {
                errorNofity('Error Occured!!!Please Contact EDP')
            }
            setcolor(!color)
        }

    }

    return (
        <Fragment>
            <TableBody>
                <TableRow

                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row" align="left"><IconButton onClick={changecolor} >
                        <CheckCircleOutlinedIcon color={
                            (mandatoryflag === 1) || (color === false) ? "error" : "primary"
                        } />
                    </IconButton>
                    </TableCell>
                    <TableCell
                        component="th" scope="row" align="center"
                    >
                        {name}
                    </TableCell>
                    <TableCell
                        component="th" align="right" scope="row"
                    >
                        {indicators}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Fragment>
    )
};

export default Approvalvalue;
