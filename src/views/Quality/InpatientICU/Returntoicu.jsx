import React, { Fragment } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import { TextField, Card } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Commonfoot from 'src/views/CommonCode/Commonfoot'
import DoctornameSelect from 'src/views/CommonCode/DoctornameSelect'
import TextInput from 'src/views/Component/TextInput'

const Returntoicu = () => {
  const { id } = useParams()

  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <div className="card col-md-12" style={{ backgroundColor: '#e8eaf6' }}>
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
                  <h5>Return To ICU</h5>
                </div>
                <Card className="card-body">
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-md-6 pl-0">
                          <DoctornameSelect
                            style={{
                              minHeight: 10,
                              maxHeight: 27,
                              paddingTop: 0,
                              paddingBottom: 4,
                            }}
                          />
                        </div>
                        {/* <div className="col-md-6 pt-2"> */}
                        <div className="col-md-3">
                          <label htmlFor="test" className="form-label">
                            Return to Icu Date/Time
                          </label>
                        </div>
                        <div className="col-md-3">
                          <TextInput
                            fullwidth
                            id="test"
                            type="datetime-local"
                            classname="form-control form-control-sm"
                            Placeholder="ddd"
                          />
                        </div>
                      </div>
                      {/* </div> */}
                      <div className="row">
                        <div className="col-md-6 col-sm-12 col-xs-6 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="Present Complaints"
                          />
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-6 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="Previous Complaints"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 pt-2 pl-1">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="Remarkz"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                </Card>
                <Commonfoot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default Returntoicu
