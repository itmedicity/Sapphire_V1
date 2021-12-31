import { FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, Fragment, useState, useContext, useEffect } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EquipmentSelect = ({ distrue, style }) => {
    const [equipment, setEquipment] = useState([])
    const { selectEquipment, updateEquipment } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getequipment = async () => {
            const result = await axioslogin.get('/equipmentMaster')
            const { data } = await result.data;
            setEquipment(data)
        }
        getequipment()
    }, [updateEquipment]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-4">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    value={selectEquipment}
                    name="selectEquipment"
                    style={style}
                    onChange={(e) => updateEquipment(e.target.value)}
                    defaultValue={0}
                    disabled={distrue}


                >
                    <MenuItem value='0' disabled>
                        Select Equipment
                    </MenuItem>
                    {
                        equipment && equipment.map((val, index) => {
                            return (<MenuItem key={index} value={val.euipment_slno}>{val.euipment_name}
                            </MenuItem>)
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EquipmentSelect)
