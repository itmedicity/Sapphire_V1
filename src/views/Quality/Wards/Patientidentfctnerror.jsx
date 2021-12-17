import React, { Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import PatientCard from '../Inpatient/PatientCard'
import { useHistory, useParams } from 'react-router'
import { MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import { FormControl, Select } from '@material-ui/core'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
// import { useStyles } from 'src/views/CommonCode/MaterialStyle'

const Patientidentfctnerror = () => {
  const { id } = useParams()

  const history = useHistory()
  // const RedirectToProfilePage = () => {
  //   history.push(`/Home/InpatientEdit/${id}`)
  // }

  const [toggle, setToggle] = useState(0)

  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <form
      // onSubmit={submitFormData}
      >
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2 pt-2">
                <FormControl margin="dense" className="mt-1">
                  <Select
                    labelId="test-select-label"
                    name="patientidentification"
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
              <div className="col-md-10 pt-2">
                {toggle === '2' ? (
                  <Actiontaken />
                ) : (
                  <TextInput
                    type="text"
                    classname="form-control form-control-sm"
                    Placeholder="Remarks"
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="card-footer"
        // style={{
        //   backgroundColor: '#b6b8c3',
        // }}
        >
          <div className="col-md-12">
            <FooterClosebtn />
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default Patientidentfctnerror
