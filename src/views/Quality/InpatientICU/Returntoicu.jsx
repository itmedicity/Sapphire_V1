import React, { Fragment, useState, useContext, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
// import PatientCard from '../Inpatient/PatientCard'
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
import moment from 'moment'

const Returntoicu = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const RedirectToProfilePage = () => {
    history.push(`/Home/InpatientEdit/${id}`)
  }
  const [enable, setenable] = useState(false)
  const [value, setvalue] = useState(0)
  //setting initial state

  const [distrue, setdistrue] = useState(false)

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
  const postDataEdit = {
    inpt_slno: id,
    user_slno: userslno(),
    do_code: selectDoctor,
    rtnicu_datetime: datetime,
    prsnt_complaint: prsntcomplaint,
    prvious_complaint: prevcomplaint,
    remark: remark
  }
  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/returntoIcu', postData)

    if (value === 1) {
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        setdistrue(true)
        setenable(true)

        updateDoctor(0)
      } else if (success === 0) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }
    else {
      const result = await axioslogin.patch('/returntoIcu', postDataEdit)
      const { success, message } = result.data
      if (success === 2) {
        succesNofity(message)
        setdistrue(true)
        setenable(true)
      } else if (success === 1) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
        setdistrue(true)
      }
    }
  }
  useEffect(() => {
    const returntoicu = async () => {
      const result = await axioslogin.get(`returntoIcu/${id}`)
      const { success, data } = result.data
      if (success === 1) {

        const { do_code, inpt_slno, prsnt_complaint,
          prvious_complaint, remark,
          rtnicu_datetime, rticu_flag, user_slno
        } = data[0]
        const frmData = {
          datetime: moment(rtnicu_datetime).format("YYYY-MM-DD[T]HH:mm:ss"),
          prsntcomplaint: prsnt_complaint,
          prevcomplaint: prvious_complaint,
          remark: remark,
        }
        setreturntoicuData(frmData)
        updateDoctor(do_code)
        setvalue(inpt_slno)
        setenable(true)
        setdistrue(true)
      }
      else if (success === 2) {
        setenable(false)
        setdistrue(false)
        setvalue(0)
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    returntoicu()
  }, [id, updateDoctor])


  const editreturn = () => {
    setenable(false)
    setdistrue(false)
  }
  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <form className={classes.root} onSubmit={submitFormData}>
        <div className="card-body">
          <div className="row">
            <Card className="card-body">
              <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-6 pl-0">
                      <DoctornameSelect
                        distrue={distrue}
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
                        disabled={enable}
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
                        disabled={enable}
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
                        disabled={enable}
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
                        disabled={enable}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-1"></div>
              </div>
            </Card>
            <div className="card-footer"
            // style={{
            //   backgroundColor: '#b6b8c3',
            // }}
            >
              <div className="col-md-12">
                <FooterClosebtn
                  edit={editreturn}
                />
              </div>
            </div>
          </div>
        </div>

      </form>
    </Fragment>
  )
}
export default Returntoicu
