
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Stack, TextField } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'


const DatetimeField = (props) => {
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
                        renderInput={(params) => <TextField {...params} size="small" />}
                    />
                </Stack>
            </LocalizationProvider>
        </Fragment>
    )
}

export default memo(DatetimeField)
