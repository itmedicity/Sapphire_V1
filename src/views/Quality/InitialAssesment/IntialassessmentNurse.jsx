import React, { Fragment, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { Card } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
const IntialassessmentNurse = () => {
  const { id } = useParams()
  const history = useHistory()

  //   setting intial state
  const [intAssmntNurseData, setintAssmntNurseData] = useState({
    arrived_time_ns: '',
    initialassemnt_startns: '',
    initialassemnt_endns: '',
    remarkns: '',
  })
  //   default state
  const defaultstate = {
    arrived_time_ns: '',
    initialassemnt_startns: '',
    initialassemnt_endns: '',
    remarkns: '',
  }

  //   destructing object
  const { arrived_time_ns,
    initialassemnt_startns,
    initialassemnt_endns,
    remarkns,
  } = intAssmntNurseData

  // getting data from the form
  const updateFormData = async (e) => {
    const value = e.target.value
    setintAssmntNurseData({ ...intAssmntNurseData, [e.target.name]: value })
  }
  const postData = {
    inpt_slno: id,
    pt_receivetime: arrived_time_ns,
    ia_startnstime: initialassemnt_startns,
    ia_endnstime: initialassemnt_endns,
    ian_remark: remarkns,
    user_slno: userslno(),
  }

  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/assesmentnurse', postData)
    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setintAssmntNurseData(defaultstate)
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
        <Card className="card-body">
          <div className="col-md-12">
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
                  changeTextValue={(e) => updateFormData(e)}
                  value={arrived_time_ns}
                  name="arrived_time_ns"
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
                  changeTextValue={(e) => updateFormData(e)}
                  value={initialassemnt_startns}
                  name="initialassemnt_startns"
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
                  value={initialassemnt_endns}
                  name="initialassemnt_endns"
                />
              </div>
              <div className="col-md-2  pb-1">
                <label htmlFor="test" className="form-label">
                  Remark
                </label>
                <TextInput classname="form-control form-control-sm" Placeholder="Remark"
                  changeTextValue={(e) => updateFormData(e)}
                  value={remarkns}
                  name="remarkns" />
              </div>

            </div>
          </div>
        </Card>
      </form>
    </Fragment>
  )
}

export default IntialassessmentNurse
