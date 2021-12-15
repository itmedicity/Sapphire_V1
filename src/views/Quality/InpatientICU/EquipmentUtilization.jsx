import { Card } from '@mui/material'
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import PatientCard from '../Inpatient/PatientCard'
import { useHistory, useParams } from 'react-router'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EquipmentSelect from 'src/views/CommonCode/EquipmentSelect'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'

const EquipmentUtilization = () => {
  const { id } = useParams()
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }

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
                  <h5>Equipment Utilization</h5>
                </div>
                <Card className="card-body">
                  <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-4">
                          <EquipmentSelect />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="test" className="form-label">
                            Utilization Start time
                          </label>
                          <TextInput
                            id="test"
                            type="datetime-local"
                            classname="form-control form-control-sm"
                            Placeholder="Utilization"
                          />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="test" className="form-label">
                            Utilization End time
                          </label>
                          <TextInput
                            id="test"
                            type="datetime-local"
                            classname="form-control form-control-sm"
                            Placeholder="Utilization"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                </Card>
                <div
                  className="card-footer text-muted"
                  style={{
                    backgroundColor: '#b6b8c3',
                  }}
                >
                  <FooterClosebtn redirect={RedirectToProfilePage} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default EquipmentUtilization
