import { FormControl, MenuItem, Select } from '@mui/material'
import React, { Fragment, useEffect, useState, memo, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const BloodGroupSelect = ({ style }) => {
  const [bloodgroup, setbloodgroup] = useState([])
  const { selectBloodGroup, updateBloodGroup } = useContext(PayrolMasterContext)

  // useeffect
  useEffect(() => {
    const getbloodgroupdata = async () => {
      const result = await axioslogin.get('/bloodmaster')
      const { data } = await result.data
      setbloodgroup(data)
    }
    getbloodgroupdata()
  }, [updateBloodGroup])


  return (
    <Fragment>
      <FormControl fullWidth margin="dense" className="mt-1">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="outlined"
          className="ml-0"
          fullWidth
          name="selectbloodgroup"
          value={selectBloodGroup}
          style={style}
          onChange={(e) => updateBloodGroup(e.target.value)}
          defaultValue={0}
        >
          <MenuItem value="0" disabled>
            Select Blood
          </MenuItem>
          {bloodgroup &&
            bloodgroup.map((val, index) => {
              return (
                <MenuItem key={index} value={val.bldmst_slno}>
                  {val.bldmast_name}
                </MenuItem>
              )
            })}
        </Select>
      </FormControl>
    </Fragment>
  )
}

export default memo(BloodGroupSelect)
