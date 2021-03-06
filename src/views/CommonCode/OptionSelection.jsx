import { FormControl, MenuItem, Select } from '@mui/material'
import React, { Fragment, memo, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'

const OptionSelection = ({ style }) => {

  const { selectOption, updateOption } = useContext(PayrolMasterContext)



  return (
    <Fragment>
      <FormControl fullWidth margin="dense" className="mt-1">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          variant="outlined"
          className="ml-0"
          fullWidth
          name="selectOption"
          value={selectOption}
          style={style}
          onChange={(e) => updateOption(e.target.value)}
          defaultValue={0}
        // disabled={disablee}
        >
          <MenuItem value="0">Selected Option</MenuItem>
          <MenuItem value="1">Yes</MenuItem>
          <MenuItem value="2">No</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  )
}

export default memo(OptionSelection)
