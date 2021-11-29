import React, { Fragment, useState, memo } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'

const Dietititaincard = () => {
    const [state, changeState] = useState("Nill")
    const [toggle, setToggle] = useState(false)

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="row">
                <div className="col-md-3">
                    <FormControl
                        fullWidth
                        margin="dense"
                        className="mt-1"
                    >
                        <Select
                            // value={0}
                            onChange={(e) => { setToggle(e.target.value) }}
                            fullWidth
                            size="small"
                            className="ml-0"
                            labelId="test-select-label"
                            label={"Nursing Assessment"}
                        >
                            <MenuItem >Select Option</MenuItem>
                            <MenuItem value='1'>Yes</MenuItem>
                            <MenuItem value='2'>No</MenuItem>
                        </Select>
                        <InputLabel id="test-select-label">Nursing Assessment</InputLabel>
                    </FormControl>
                </div>
                {/* Condition checking plus loading component */}

                {/* Condition checking plus loading component */}
                {toggle === '1' ? <Actiontaken mail={state} /> : null}
                <div className="col-md-7 pt-1">
                    <TextField fullWidth label="Remark" size="small" /></div>


            </div>
        </Fragment>
    )
}

export default memo(Dietititaincard)
