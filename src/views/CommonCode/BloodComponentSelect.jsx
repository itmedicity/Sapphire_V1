import { FormControl, MenuItem, Select } from '@mui/material'
import React, { Fragment, useEffect, useState, memo, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const BloodComponentSelect = ({ style }) => {

    const [bloodcomponent, setbloodcomponent] = useState([])
    const { selectBloodComponent, updateBloodComponent } = useContext(PayrolMasterContext)


    // useeffect
    useEffect(() => {
        const getbloodcomponentdata = async () => {
            const result = await axioslogin.get('/bloodcomponentmaster')
            const { data } = await result.data
            setbloodcomponent(data)
        }
        getbloodcomponentdata()
    }, [updateBloodComponent])




    return (
        <Fragment>
            <FormControl fullWidth margin="dense" className="mt-1">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    className="ml-0"
                    fullWidth
                    name="selectBloodComponent"
                    value={selectBloodComponent}
                    style={style}
                    onChange={(e) => updateBloodComponent(e.target.value)}
                    defaultValue={0}
                >
                    <MenuItem value={0}>
                        Select Component
                    </MenuItem>
                    {bloodcomponent &&
                        bloodcomponent.map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.bldcomp_slno}>
                                    {val.bldcomponent_name}
                                </MenuItem>
                            )
                        })}

                </Select>
            </FormControl>

        </Fragment>
    )
}

export default memo(BloodComponentSelect)
