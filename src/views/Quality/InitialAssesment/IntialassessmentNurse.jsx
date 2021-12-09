import React, { Fragment } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { Card } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'

const IntialassessmentNurse = () => {
  const { id } = useParams()

  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <div className="card col-md-12" style={{ backgroundColor: '#e8eaf6' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              {/* passing id to patient card componet */}
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
                  <h5>Initial Assessment Doctor</h5>
                </div>
                <Card className="card-body">
                  <div className="row">
                    <div className="col-md-3  pb-1">
                      <label htmlFor="test" className="form-label">
                        Arrived Time
                      </label>
                      <TextInput
                        id="test"
                        type="datetime-local"
                        classname="form-control form-control-sm"
                        Placeholder="Arrived Time"
                      />
                    </div>
                    <div className="col-md-3  pb-1">
                      <label htmlFor="test" className="form-label">
                        Initial Assessment start
                      </label>
                      <TextInput
                        id="test"
                        type="datetime-local"
                        classname="form-control form-control-sm"
                        Placeholder="Initial Assessment start"
                      />
                    </div>
                    <div className="col-md-3  pb-1">
                      <label htmlFor="test" className="form-label">
                        Initial Assessment End
                      </label>
                      <TextInput
                        id="test"
                        type="datetime-local"
                        classname="form-control form-control-sm"
                        Placeholder="Initial Assessment End"
                      />
                    </div>
                    <div className="col-md-3  pb-1">
                      <label htmlFor="test" className="form-label">
                        Remark
                      </label>
                      <TextInput classname="form-control form-control-sm" Placeholder="Remark" />
                    </div>
                  </div>
                </Card>

                <div
                  className="card-footer text-muted"
                  style={{
                    backgroundColor: '#b6b8c3',
                  }}
                >
                  <FooterClosebtn

                  // redirect={RedirectToProfilePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default IntialassessmentNurse
