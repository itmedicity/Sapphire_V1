import React, { Fragment, useState, useContext } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import { ToastContainer } from 'react-toastify'
import { useParams, useHistory } from 'react-router'
import DoctornameSelect from 'src/views/CommonCode/DoctornameSelect'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { Card } from '@mui/material'
const Returntoicu = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  //setting initial state
  const [returntoicuData, setreturntoicuData] = useState({
    datetime: '',
    prsntcomplaint: '',
    prevcomplaint: '',
    remark: ''
  })
  //defaultb state
  const defaultstate = {
    datetime: '',
    prsntcomplaint: '',
    prevcomplaint: '',
    remark: '',
  }

  //destrutring object
  const {
    datetime,
    prsntcomplaint,
    prevcomplaint,
    remark,
  } = returntoicuData

  //select doctorselect
  const { selectDoctor, updateDoctor } = useContext(PayrolMasterContext)

  //getting data from the form 

  const updateFormData = async (e) => {
    const value = e.target.value
    setreturntoicuData({ ...returntoicuData, [e.target.name]: value })
  }

  const postData = {
    inpt_slno: id,
    user_slno: userslno(),
    do_code: selectDoctor,
    rtnicu_datetime: datetime,
    prsnt_complaint: prsntcomplaint,
    prvious_complaint: prevcomplaint,
    remark: remark,
  }
  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/returntoIcu', postData)
    console.log(result)
    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setreturntoicuData(defaultstate)
      updateDoctor(0)
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
      <form className={classes.root} onSubmit={submitFormData}>
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
                            changeTextValue={(e) => updateFormData(e)}
                            classname="form-control form-control-sm"
                            value={datetime}
                            name="datetime"
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
                            value={prsntcomplaint}
                            name="prsntcomplaint"
                            changeTextValue={(e) => updateFormData(e)}
                          />
                        </div>
                        <div className="col-md-6 col-sm-12 col-xs-6 pt-2">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="Previous Complaints"
                            value={prevcomplaint}
                            name="prevcomplaint"
                            changeTextValue={(e) => updateFormData(e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 pt-2 pl-1">
                          <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="Remarkz"
                            value={remark}
                            name="remark"
                            changeTextValue={(e) => updateFormData(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1"></div>
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
export default Returntoicu
