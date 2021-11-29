
import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Stack } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { memo, useState } from 'react'
import { TextField } from '@material-ui/core';



const Datetimepicker = () => {
    const [value, setValue] = useState(new Date());
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
            </Stack>
        </LocalizationProvider>
    )
}

export default memo(Datetimepicker)
