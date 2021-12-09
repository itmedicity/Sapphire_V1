
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Stack, TextField } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'


const DatetimeField = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(new Date());
    const handleChange = (newValue) => {
        setValue(newValue);
    }

    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <Stack spacing={3}>
                    <DateTimePicker
                        label={props.label}
                        size="small"
                        value={value}
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            className: classes.customInputFeild
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                </Stack>
            </LocalizationProvider>
        </Fragment>
    )
}

export default memo(DatetimeField)
