
import React, { Fragment, useContext } from 'react'
import { FormControl, MenuItem, Select } from '@mui/material'
import { PayrolMasterContext } from 'src/Context/MasterContext'





const ShiftSelection = ({ style }) => {
    const { SelectShift, updateShift } = useContext(PayrolMasterContext)
    return (
        <Fragment>
            <FormControl fullWidth margin="dense" className="mt-1">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    className="ml-0"
                    fullWidth
                    name="SelectShift"
                    value={SelectShift}
                    style={style}
                    onChange={(e) => updateShift(e.target.value)}
                    defaultValue={0}
                >
                    <MenuItem value="0">Selected Shift</MenuItem>
                    <MenuItem value="1">Morning</MenuItem>
                    <MenuItem value="2">Evening</MenuItem>
                    <MenuItem value="3">Night</MenuItem>
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default ShiftSelection
