import React, { Fragment } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const Pendingindictor = () => {
    return (<Fragment>
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="info">some patient indicators has not be done  - Check it out </Alert>
        </Stack>
    </Fragment>

    )
};

export default Pendingindictor;
