import React, { Fragment } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Mandatoryindictor = () => {
    return (
        <Fragment>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="info">Some Mandatory indicators are not complete  </Alert>
            </Stack>
        </Fragment>
    )
}

export default Mandatoryindictor