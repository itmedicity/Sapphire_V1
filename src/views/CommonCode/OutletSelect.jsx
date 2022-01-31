import { FormControl, MenuItem, Select } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'

const OutletSelect = ({ style }) => {

    const [outlet, setoutlet] = useState([])
    const { selectOutlet, updateOutlet } = useContext(PayrolMasterContext)


    // useeffect
    useEffect(() => {
        const getoutletdata = async () => {
            const result = await axioslogin.get('/outlet')
            const { data } = await result.data
            setoutlet(data)
        }
        getoutletdata()
    }, [updateOutlet])

    return (
        <Fragment>
            <FormControl fullWidth margin="dense" className="mt-1">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    className="ml-0"
                    fullWidth
                    name="selectOutlet"
                    value={selectOutlet}
                    style={style}
                    onChange={(e) => updateOutlet(e.target.value)}
                    defaultValue={0}
                >
                    <MenuItem value={0}>
                        Select Outlet
                    </MenuItem>
                    {outlet &&
                        outlet.map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.ou_code}>
                                    {val.ouc_desc}
                                </MenuItem>
                            )
                        })}

                </Select>
            </FormControl>

        </Fragment>
    )

};

export default OutletSelect;

