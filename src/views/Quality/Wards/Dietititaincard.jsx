import React, { Fragment, useState, memo, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { FormControl, MenuItem, Select } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
const Dietititaincard = ({ setfunc, handover, setdietvaluemain, id, togglee, disabled }) => {
  const [toggle, setToggle] = useState(0)
  const [dietval, setdietvalue] = useState({
    inpt_slno: id,
    user_slno: userslno(),
    dietian: '',
    remarks: '',
  })
  //destructring the data
  const {
    dietian,
    remarks
  } = dietval
  const updateFormData = async (e) => {
    const value = e.target.value
    setdietvalue({ ...dietval, [e.target.name]: value })
    setdietvaluemain(dietval)
  }
  useEffect(() => {
    setToggle(togglee)
  }, [])
  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <div className="row">
        <div className="col-md-3 pt-2">
          <FormControl fullWidth margin="dense" className="mt-1">
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
              disabled={disabled}
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
          {toggle == 2 ? (
            <Actiontaken setfunc={setfunc} handover={handover} />
          ) : (
            <TextInput type="text"
              classname="form-control form-control-sm"
              Placeholder="Remarks"
              value={remarks}
              name="remarks"
              disabled={disabled}
              changeTextValue={(e) => updateFormData(e)} />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default memo(Dietititaincard)
