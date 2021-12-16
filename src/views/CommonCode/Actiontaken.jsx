import classNames from 'classnames'
import React, { Fragment, memo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'
import TextInput from '../Component/TextInput'


const Actiontaken = (setfunc) => {

  //intial state
  const [actiontakenData, setactiontakenData] = useState({
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
  })

  const { errordesc, personresponsible, actiontaken } = actiontakenData

  const updateFormData = async (e) => {
    const value = e.target.value
    setactiontakenData({ ...actiontakenData, [e.target.name]: value })
    setfunc.setfunc({ ...actiontakenData, [e.target.name]: value })

  }


  return (
    <Fragment>
      <ToastContainer />
      <SessionCheck />
      <form className={classNames.root}>
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
