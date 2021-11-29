import { Avatar, Grid } from '@material-ui/core'
import React from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Nameavatar = ({ row }) => {
    return (
        <div>
            <Grid container alignItems="center">
                <Grid item sm={3}>
                    <Avatar style={{ backgroundColor: "#4dabf5" }}>
                        <PermIdentityIcon />
                    </Avatar>
                </Grid>
                <Grid item>
                    {row}
                </Grid>
            </Grid>
        </div>
    )
}
export default Nameavatar
