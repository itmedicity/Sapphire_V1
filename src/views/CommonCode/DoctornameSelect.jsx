import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useState, memo, useEffect } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DoctornameSelect = () => {
    const [doctor, setDoctor] = useState([]);
    const { selectDoctor, updateDoctor } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getdoctordata = async () => {
            const result = await axioslogin.get('/doctormaster')
            const { data } = await result.data;
            setDoctor(data)
        }
        getdoctordata()
        return (
            updateDoctor(0)
        )
    }, [updateDoctor]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
                label="Nutritional Screening"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectdoctor"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectDoctor}
                    onChange={(e) => updateDoctor(e.target.value)}
                >
                    <MenuItem value='0' disabled>
                        Select Doctor
                    </MenuItem>
                    {
                        doctor && doctor.map((val, index) => {
                            return <MenuItem key={index} value={val.do_code}>{val.doc_name}
                            </MenuItem>
                        })
                    }
                </Select>

            </FormControl>
        </Fragment>
    )
}

export default memo(DoctornameSelect)





