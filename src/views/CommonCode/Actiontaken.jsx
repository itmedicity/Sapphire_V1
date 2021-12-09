import classNames from 'classnames'
import React, { Fragment, memo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from '../Axios/Axios'
import SessionCheck from '../Axios/SessionCheck'
import TextInput from '../Component/TextInput'
import { errorNofity, succesNofity, warningNofity } from './Commonfunc'

const Actiontaken = () => {
  const [count, setCount] = useState(0)
  //intial state
  const [actiontakenData, setactiontakenData] = useState({
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
  })

  //default State

  const defaultstate = {
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
  }

  // destructing object

  const { errordesc, personresponsible, actiontaken } = actiontakenData

  // getting data from the form

  const updateFormData = async (e) => {
    const value = e.target.value
    setactiontakenData({ ...actiontakenData, [e.target.name]: value })
  }
  const postData = {
    pie_errordesc: errordesc,
    pie_prsnresponsible: personresponsible,
    pie_actntkn: actiontaken,
  }

  // Saving form data

  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/patientIdenticationError', postData)
    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setCount(count + 1)
      setactiontakenData(defaultstate)
    } else if (success === 2) {
      warningNofity(message)
    } else {
      errorNofity('Error Occured!!!Please Contact EDP')
    }
  }

  return (
    <Fragment>
      <ToastContainer />
      <SessionCheck />
      <form className={classNames.root} onSubmit={submitFormData}>
        <div className="row">
          <div className="col-md-6">
            <TextInput
              type="text"
              classname="form-control form-control-sm"
              Placeholder="Error Description"
              changeTextValue={(e) => updateFormData(e)}
              value={errordesc}
              name="errordesc"
            />
          </div>
          <div className="col-md-3">
            <TextInput
              type="text"
              classname="form-control form-control-sm"
              Placeholder="Person Responsible"
              changeTextValue={(e) => updateFormData(e)}
              value={personresponsible}
              name="personresponsible"
            />
          </div>
          <div className="col-md-3">
            <TextInput
              type="text"
              classname="form-control form-control-sm"
              Placeholder="Action Taken"
              changeTextValue={(e) => updateFormData(e)}
              value={actiontaken}
              name="actiontaken"
            />
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default memo(Actiontaken)
