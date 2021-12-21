import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { Card } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { axioslogin } from 'src/views/Axios/Axios'
import { userslno } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment'


const InitialassesmentDoctor = () => {
  const { id } = useParams()
  const history = useHistory()
  const [distrue, setdistrue] = useState(false)
  const [indate, setinsdate] = useState(moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss"))
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
  useEffect(() => {
    const getinitailassessdoc = async () => {
      const result = await axioslogin.get(`initalassessmentDoc/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        setdistrue(true)
        const { iad_start_time, iad_end_time, iad_remark, pt_received_time } = data[0]
        const frmData = {
          arrived_time: moment(pt_received_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          intialassessment_start: moment(iad_start_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          intialassessment_end: moment(iad_end_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          remark: iad_remark
        }
        setintAssmntDoctorData(frmData)
      }
    }
    getinitailassessdoc()
  }, [id])


  //   default state
  const defaultstate = {
    arrived_time: '',
    intialassessment_start: '',
    intialassessment_end: '',
    remark: '',
  }

  //   destructing object
  const { arrived_time,
    intialassessment_start,
    intialassessment_end,
    remark,
  } = intAssmntDoctorData

  // getting data from the form

  const updateFormData = async (e) => {
    const value = e.target.value
    setintAssmntDoctorData({ ...intAssmntDoctorData, [e.target.name]: value })

  }
  const postData = {
    inpt_slno: id,
    pt_received_time: arrived_time,
    iad_start_time: intialassessment_start,
    iad_end_time: intialassessment_end,
    iad_remark: remark,
    user_slno: userslno(),
  }

  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/initalassessmentDoc', postData)
    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setdistrue(true)

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
                  disabled={distrue}
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
                  disabled={distrue}
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
                  disabled={distrue}
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
                  disabled={distrue}
                />
              </div>
            </div>
          </div>
        </Card>
        <div className="card-footer"
        // style={{
        //   backgroundColor: '#b6b8c3',
        // }}
        >
          <div className="col-md-12">
            <FooterClosebtn />
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default InitialassesmentDoctor
