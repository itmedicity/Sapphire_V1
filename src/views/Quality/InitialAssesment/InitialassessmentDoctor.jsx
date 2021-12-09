import React, { Fragment, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { Card } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const InitialassesmentDoctor = () => {
  const { id } = useParams()
  const [count, setCount] = useState(0)
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }

  //   setting intial state
  const [intAssmntDoctorData, setintAssmntDoctorData] = useState({
    arrived_time: '',
    intialassessment_start: '',
    intialassessment_end: '',
    remark: '',
  })

  //   default state
  const defaultstate = {
    arrived_time: '',
    intialassessment_start: '',
    intialassessment_end: '',
    remark: '',
  }

  //   destructing object
  const { arrived_time, intialassessment_start, intialassessment_end, remark } = intAssmntDoctorData

  // getting data from the form

  const updateFormData = async (e) => {
    const value = e.target.value
    setintAssmntDoctorData({ ...intAssmntDoctorData, [e.target.name]: value })
  }
  const postData = {
    inpt_slno: id,
    bldmst_slno: arrived_time,
    bagrequested: intialassessment_start,
    bagreq_time: intialassessment_end,
    bagreceived: remark,
  }
  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/bloodcomponents', postData)

    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setCount(count + 1)
      setintAssmntDoctorData(defaultstate)
    } else if (success === 2) {
      warningNofity(message)
    } else {
      errorNofity('Error Occured!!!Please Contact EDP')
    }
  }

  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <form onSubmit={submitFormData}>
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
                        <label htmlFor="test" className="form-label" style={{ fontSize: '1rem ' }}>
                          Arrived Time
                        </label>
                        <TextInput
                          id="test"
                          type="datetime-local"
                          classname="form-control form-control-sm"
                          Placeholder="Arrived Time"
                          changeTextValue={(e) => updateFormData(e)}
                          value={arrived_time}
                          name="arrived_time"
                        />
                      </div>
                      <div className="col-md-3 pb-1">
                        <label htmlFor="test" className="form-label">
                          Initial Assessment start
                        </label>
                        <TextInput
                          id="test"
                          type="datetime-local"
                          classname="form-control form-control-sm"
                          Placeholder="Initial Assessment start"
                          changeTextValue={(e) => updateFormData(e)}
                          value={intialassessment_start}
                          name="intialassessment_start"
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
                          changeTextValue={(e) => updateFormData(e)}
                          value={intialassessment_end}
                          name="intialassessment_end"
                        />
                      </div>
                      <div className="col-md-3  pb-1">
                        <label htmlFor="test" className="form-label">
                          Remark
                        </label>
                        <TextInput
                          classname="form-control form-control-sm"
                          Placeholder="Remark"
                          changeTextValue={(e) => updateFormData(e)}
                          value={remark}
                          name="remark"
                        />
                      </div>
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
      </form>
    </Fragment>
  )
}

export default InitialassesmentDoctor
