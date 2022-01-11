import React, { Fragment, useState, memo, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { FormControl, MenuItem, Select } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
const Dietititaincard = ({
  setremarkdata,
  setactiontakendata,
  actiontakendata,
  setdonenotdonemain,
  donotdonemain,
  remarkdata,
  distrue

}) => {
  const [donenotdone, setdonenotdone] = useState(0)//for toggle done or notdone

  const [remarksdata, setremark] = useState({
    remarks: ''
  })//for set remark
  const { remarks } = remarksdata
  const updateFormData = async (e) => {
    const value = e.target.value
    setremark({ ...remarks, [e.target.name]: value })
    setremarkdata({ ...remarks, [e.target.name]: value })
  }
  useEffect(() => {
    setremark(remarkdata)
    setdonenotdone(donotdonemain)
  }, [remarkdata, donotdonemain])


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
              value={donenotdone}
              size="small"
              id="demo-simple-select"
              onChange={(e) => {
                setdonenotdone(e.target.value)
                setdonenotdonemain(e.target.value)//to update main page 
              }}
              fullWidth
              disabled={distrue}
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
          {donenotdone === 2 ? (
            <Actiontaken setfunc={setactiontakendata} handover={actiontakendata} distrue={distrue} />
          ) : (
            <TextInput type="text"
              classname="form-control form-control-sm"
              Placeholder="Remarks"
              value={remarks}
              name="remarks"
              disabled={distrue}
              changeTextValue={(e) => updateFormData(e)} />
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default memo(Dietititaincard)
