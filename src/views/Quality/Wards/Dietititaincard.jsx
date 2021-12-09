import React, { Fragment, useState, memo } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { FormControl, MenuItem, Select } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'

const Dietititaincard = () => {
  const [toggle, setToggle] = useState(0)

  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <div className="row">
        <div className="col-md-3 pt-2">
          <FormControl margin="dense" className="mt-1">
            <Select
              labelId="test-select-label"
              name="dietian"
              value={toggle}
              size="small"
              id="demo-simple-select"
              onChange={(e) => {
                setToggle(e.target.value)
              }}
              fullWidth
              variant="outlined"
              style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
            >
              <MenuItem value="0">Selected Option</MenuItem>
              <MenuItem value="1">Done</MenuItem>
              <MenuItem value="2">Not Done</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-md-9 pt-2">
          {toggle === '2' ? (
            <Actiontaken />
          ) : (
            <TextInput type="text" classname="form-control form-control-sm" Placeholder="Remarks" />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default memo(Dietititaincard)
