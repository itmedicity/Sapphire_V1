import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { Card, Typography } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
const IntialassessmentNurse = () => {
  const { id } = useParams()
  //const [distrue, setdistrue] = useState(false)
  //const [indate, setinsdate] = useState(moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss"))

  //use state for enable fields on clicking edit button
  const [enable, Setenable] = useState(false)
  const [value, setValue] = useState(0)
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
  const postDataEdit = {
    pt_receivetime: arrived_time_ns,
    ia_startnstime: initialassemnt_startns,
    ia_endnstime: initialassemnt_endns,
    ian_remark: remarkns,
    user_slno: userslno(),
    inpt_slno: value,
  }
  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    if (value === 0) {
      const result = await axioslogin.post('/assesmentnurse', postData)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        Setenable(true)

      } else if (success === 0) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }
    else {
      const result = await axioslogin.patch('/assesmentnurse', postDataEdit)
      const { success, message } = result.data
      if (success === 2) {
        succesNofity(message)
        Setenable(true)
      } else if (success === 1) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }

  }
  useEffect(() => {
    const getinitailassessnurse = async () => {
      const result = await axioslogin.get(`assesmentnurse/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        Setenable(true)
        const { inpt_slno, pt_receivetime, ia_startnstime, ia_endnstime, ian_remark } = data[0]
        const frmData = {
          arrived_time_ns: moment(pt_receivetime).format("YYYY-MM-DD[T]HH:mm:ss"),
          initialassemnt_startns: moment(ia_startnstime).format("YYYY-MM-DD[T]HH:mm:ss"),
          initialassemnt_endns: moment(ia_endnstime).format("YYYY-MM-DD[T]HH:mm:ss"),
          remarkns: ian_remark
        }
        setintAssmntNurseData(frmData)
        setValue(inpt_slno)
      }
      else if (success === 2) {
        Setenable(false)
        setValue(0)
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    getinitailassessnurse()
  }, [id])
  const editinitialassessment = () => {
    Setenable(false)
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
                <Typography fontSize={16} noWrap={true} >Arrived Time</Typography>
                <TextInput
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Arrived Time"
                  changeTextValue={(e) => updateFormData(e)}
                  value={arrived_time_ns}
                  name="arrived_time_ns"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3  pb-1">
                <Typography fontSize={16} noWrap={true} >Initial Assessment Start</Typography>
                <TextInput
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Initial Assessment start"
                  changeTextValue={(e) => updateFormData(e)}
                  value={initialassemnt_startns}
                  name="initialassemnt_startns"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3  pb-1">
                <Typography fontSize={16} noWrap={true} >Initial Assessment End</Typography>
                <TextInput
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Initial Assessment End"
                  changeTextValue={(e) => updateFormData(e)}
                  value={initialassemnt_endns}
                  name="initialassemnt_endns"
                  disabled={enable}
                />
              </div>
              <div className="col-md-2  pb-1">
                <Typography fontSize={16} noWrap={true} >Remarks</Typography>
                <TextInput classname="form-control form-control-sm" Placeholder="Remark"
                  changeTextValue={(e) => updateFormData(e)}
                  value={remarkns}
                  name="remarkns"
                  disabled={enable} />
              </div>
            </div>
          </div>
        </Card>
        <div className="card-footer"
        // style={{
        //   backgroundColor: '#b6b8c3',
        // }}
        >
          <div className="col-md-12 p-0">
            <FooterClosebtn
              edit={editinitialassessment}
            //redirect={RedirectToProfilePage}
            // value={value}
            />
          </div>
        </div>

      </form>
    </Fragment>
  )
}

export default IntialassessmentNurse
