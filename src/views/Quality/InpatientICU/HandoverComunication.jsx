import React, { Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'

const HandoverComunication = () => {
  const { id } = useParams()
  const classes = useStyles()
  const [toggle, setToggle] = useState(0)
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }

  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />

      <form className={classes.root}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <PatientCard id={id} />
            </div>
            <div className="col-md-9  col-sm-12">
              <div className="card">
                <div
                  className="card-header  text-black "
                  style={{
                    backgroundColor: '#b6b8c3',
                  }}
                >
                  <h5>Appropriate Handover </h5>
                </div>
                <Card className="card-body">
                  <div className="row">
                    <div className="col-md-2 pt-2">
                      <FormControl margin="dense" className="mt-1">
                        <Select
                          labelId="test-select-label"
                          name="handover"
                          value={toggle}
                          size="small"
                          id="demo-simple-select"
                          onChange={(e) => {
                            setToggle(e.target.value)
                            // sethandoverdata(e.target.value)
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
                    <div className="col-md-10 pt-2 pl-0">
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
                </Card>

                <div className="card-footer  text-muted " style={{ backgroundColor: '#b6b8c3' }}>
                  <FooterClosebtn redirect={RedirectToProfilePage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}
export default HandoverComunication
