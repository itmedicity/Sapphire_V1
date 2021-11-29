import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { memo, Fragment, useState, useContext, useEffect } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EquipmentSelect = () => {
    const [equipment, setEquipment] = useState([]);
    const { selectEquipment, updateEquipment } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getequipment = async () => {
            const result = await axioslogin.get('/equipmentMaster')
            const { data } = await result.data;
            setEquipment(data)
        }
        getequipment()
        return (
            updateEquipment(0)
        )
    }, [updateEquipment]);


    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectequipment"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectEquipment}
                    onChange={(e) => updateEquipment(e.target.value)}
                >
                    <MenuItem value='0' disabled>
                        Select Equipment
                    </MenuItem>
                    {
                        equipment && equipment.map((val, index) => {
                            return <MenuItem key={index} value={val.euipment_slno}>{val.euipment_name}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EquipmentSelect)
